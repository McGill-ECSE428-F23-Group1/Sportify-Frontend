const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { frontendBaseUrl, createUser, getUser, updateBasicProfile, deleteUser, addSportLevel, getSportLevelPairsFromString } = require('./utils');

Given(/^the user is at the profile page$/, async function () {
    let profileButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'PROFILE')]")));
    await this.driver.executeScript('arguments[0].click();', profileButton);
})

Given(/^a user with username (.*), gender (.*), and sports (.*) is logged in$/, async function (username, gender, sports) {
    await deleteUser(username);
    const createResponse = await createUser(username, '12345678');
    assert(createResponse.status == 200);
    const updateResponse = await updateBasicProfile(username, '12345678', gender.toUpperCase());
    assert(updateResponse.status == 200);
    getSportLevelPairsFromString(sports).forEach(async ({ sportName, sportLevel }) => {
        addSportLevel(username, sportName, sportLevel.toUpperCase())
    });
    await this.driver.get(frontendBaseUrl);
    await this.driver.findElement(By.id('username-text-input')).sendKeys(username);
    await this.driver.findElement(By.id('password-text-input')).sendKeys('12345678');
    let loginButton = await this.driver.findElement(By.id('login-button'));
    await this.driver.executeScript('arguments[0].click();', loginButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'EXPLORE')]")));
})

When(/^the user updates password to (.*), gender to (.*), and sports from (.*) to (.*)$/, async function (password, gender, oldSportsAsString, newSportsAsString) {
    const passwordInput = await this.driver.findElement(By.id('password-update-text-input'));
    passwordInput.clear();
    passwordInput.sendKeys(password);
    await this.driver.findElement(By.id('gender-picker')).sendKeys(gender.toUpperCase());
    const oldSportsAsList = getSportLevelPairsFromString(oldSportsAsString);
    const newSportsAsList = getSportLevelPairsFromString(newSportsAsString);
    const addSportButton = await this.driver.findElement(By.id('add-sport-button'));
    await Promise.all(Array(Array(newSportsAsList.length - oldSportsAsList.length).keys()).map(async _ => await this.driver.executeScript('arguments[0].click();', addSportButton)));
    await Promise.all(newSportsAsList.map(async (_, i) => {
        await this.driver.findElement(By.id('profile-sport-name-picker-' + i)).sendKeys(newSportsAsList[i].sportName);
        await this.driver.findElement(By.id('profile-sport-level-picker-' + i)).sendKeys(newSportsAsList[i].sportLevel.toUpperCase());
    }));
})

When(/^the user presses on the \"Save\" button$/, async function () {
    let saveButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Save')]")));
    await this.driver.executeScript('arguments[0].click();', saveButton);
})

When(/^the user presses on the \"Delete account\" button$/, async function () {
    let deleteAccountButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Delete Account')]")));
    await this.driver.executeScript('arguments[0].click();', deleteAccountButton);
})

When(/^the user confirms to delete account$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    await this.driver.switchTo().alert().accept();
})

When(/^the user cancels deleting account$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    await this.driver.switchTo().alert().dismiss();
})

Then(/^the page should show the username (.*), gender (.*), and sports (.*)$/, async function (username, gender, sports) {
    assert((await this.driver.findElement(By.id('username-text')).getText()) == username);
    assert((await this.driver.findElement(By.id('gender-picker')).getAttribute("value")) == gender.toUpperCase());
    const expectedSportLevels = getSportLevelPairsFromString(sports);
    await Promise.all(expectedSportLevels.map(async ({ sportName, sportLevel }) => {
        await Promise.any(expectedSportLevels.map(async (_, i) => 
            (await this.driver.findElement(By.id('profile-sport-name-picker-' + i)).getAttribute('value')) == sportName 
                && (await this.driver.findElement(By.id('profile-sport-level-picker-' + i)).getAttribute('value')) == sportLevel.toUpperCase()
        ));
    }));
})

Then(/^the user with username (.*) should have password (.*), gender (.*), and sports (.*)$/, async function (username, password, gender, sports) {
    await this.driver.wait(until.alertIsPresent());
    await this.driver.switchTo().alert().accept();
    const response = await getUser(username);
    const profile = await response.json();
    assert(profile.username == username);
    assert(profile.password == password);
    assert(profile.gender == gender.toUpperCase());
    await Promise.all(getSportLevelPairsFromString(sports).map(async ({ sportName, sportLevel }, i) => {
        assert(profile.sports.find(sport => sport.sportName == sportName && sport.sportLevel == sportLevel.toUpperCase()));
    }));
})

Then(/^the account with username (.*) should be deleted successfully$/, async function (username) {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == 'Account deleted successfully');
    await this.driver.switchTo().alert().accept();
    const response = await getUser(username);
    assert(response.status != 200);
})

Then(/^the account with username (.*) should be kept$/, async function (username) {
    const response = await getUser(username);
    assert(response.status == 200);
})

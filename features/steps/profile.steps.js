const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { frontendBaseUrl, createUser, getUser, deleteUser } = require('./utils');

Given(/^the user is at the profile page$/, async function () {
    let profileButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'PROFILE')]")));
    await this.driver.executeScript('arguments[0].click();', profileButton);
})

Given(/^a user with username (.*), gender (.*), and sports (.*) is logged in$/, async function (username, gender, sports) {
    await deleteUser(username);
    const response = await createUser(username, '12345678');
    assert(response.status == 200);
    // TODO: Gender, sports
    await this.driver.get(frontendBaseUrl);
    await this.driver.findElement(By.id('username-text-input')).sendKeys(username);
    await this.driver.findElement(By.id('password-text-input')).sendKeys('12345678');
    let loginButton = await this.driver.findElement(By.id('login-button'));
    await this.driver.executeScript('arguments[0].click();', loginButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'EXPLORE')]")));
})

Given(/^there exists another user with username (.*)$/, async function (username) {
    await deleteUser(username);
    const response = await createUser(username, '12345678');
    assert(response.status == 200);
})

When(/^the user updates username to (.*), password to (.*), gender to (.*), and sports to (.*)$/, async function (username, password, gender, sports) {
    // TODO
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

Then(/^the page should show the username (.*), gender (.*), and sports (.*)$/, async function (username, gender, sports) {
    // TODO
})

Then(/^the information should be updated successfully$/, async function () {
    // TODO
})

Then(/^the account with username (.*) should be deleted successfully$/, async function (username) {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == 'Account deleted successfully');
    await this.driver.switchTo().alert().accept();
    const response = await getUser(username);
    assert(response.status != 200);
})

When(/^the user cancels deleting account$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    await this.driver.switchTo().alert().dismiss();
})

Then(/^the account with username (.*) should be kept$/, async function (username) {
    const response = await getUser(username);
    assert(response.status == 200);
})

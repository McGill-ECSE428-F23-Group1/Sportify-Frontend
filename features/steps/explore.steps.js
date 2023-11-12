const { Given, When, Then } = require("cucumber");
const { By, until } = require('selenium-webdriver');
const { frontendBaseUrl, createUser, deleteUser } = require('./utils');

Given(/^the system has players (.*)$/, async function (playersAsString) {
    await Promise.all(playersAsString.split(",").map(async username => {
        await deleteUser(username);
        await createUser(username, '12345678');
    }));
});

When(/^the user enters the explore page$/, async function () {
    await deleteUser('testuser');
    await createUser('testuser', '12345678');
    await this.driver.get(frontendBaseUrl);
    await this.driver.findElement(By.id('username-text-input')).sendKeys('testuser');
    await this.driver.findElement(By.id('password-text-input')).sendKeys('12345678');
    const loginButton = await this.driver.findElement(By.id('login-button'));
    await this.driver.executeScript('arguments[0].click();', loginButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'EXPLORE')]")));
    const exploreButton = await this.driver.findElement(By.xpath("//*[contains(text(), 'EXPLORE')]"));
    await this.driver.executeScript('arguments[0].click();', exploreButton);
});

Then(/^the system should display the list of players (.*)$/, async function (playersAsString) {
    await Promise.all(playersAsString.split(",").map(async username => {
        await this.driver.findElement(By.xpath(`//*[contains(text(), '${username}')]`));
    }));
});

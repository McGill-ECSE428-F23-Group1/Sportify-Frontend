const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { frontendBaseUrl, createUser, getUser, deleteUser } = require('./utils');

Given(/^the user is at the login\/signup page$/, async function () {
    await this.driver.get(frontendBaseUrl);
});

Given(/^there exists a user with username (.*(?<!and password .*)$)$/, async function (username) {
    await deleteUser(username);
    const response = await createUser(username, username);
    assert(response.status == 200);
});

Given(/^there exists a user with username (.*) and password (.*)$/, async function (username, password) {
    await deleteUser(username);
    const response = await createUser(username, password);
    assert(response.status == 200);
});

Given(/^there does not exist a user with username (.*)$/, async function (username) {
    await deleteUser(username);
    const response = await getUser(username);
    assert(response.status != 200);
});

When(/^the user enters username (.*) and password (.*)$/, async function (username, password) {
    await this.driver.findElement(By.id('username-text-input')).sendKeys(username);
    await this.driver.findElement(By.id('password-text-input')).sendKeys(password);
});

When(/^the user presses the \"Register\" button$/, async function () {
    let registerButton = await this.driver.findElement(By.id('register-button'));
    await this.driver.executeScript('arguments[0].click();', registerButton);
});

When(/^the user presses the \"Log In\" button$/, async function () {
    let loginButton = await this.driver.findElement(By.id('login-button'));
    await this.driver.executeScript('arguments[0].click();', loginButton);
});

Then(/^the registration should succeed$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Successful Registration')]")));
});

Then(/^the user should be brought to the home page$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'EXPLORE')]")));
});

Then(/^an error should appear showing that the username already exists$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'This account already exists')]")));
});

Then(/^an error should appear showing that the username does not exist$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'This account does not exist')]")));
});

Then(/^an error should appear showing that the password is incorrect$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Wrong password')]")));
});

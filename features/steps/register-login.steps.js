const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By } = require('selenium-webdriver');

Given(/^the user is at the login\/signup page$/, async function () {
    await this.driver.get('http://localhost:19006');
});

Given(/^there exists a user with username (.*(?<!and password .*)$)$/, async function (username) {
    // TODO
});

Given(/^there exists a user with username (.*) and password (.*)$/, async function (username, password) {
    // TODO
});

Given(/^there does not exist a user with username (.*)$/, async function (username) {
    // TODO
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

Then(/^the user should be brought to the home page$/, async function () {
    // TODO
});

Then(/^an error should appear showing that the username already exists$/, async function () {
    // TODO
});

Then(/^an error should appear showing that the username does not exist$/, async function () {
    // TODO
});

Then(/^an error should appear showing that the password is incorrect$/, async function () {
    // TODO
});

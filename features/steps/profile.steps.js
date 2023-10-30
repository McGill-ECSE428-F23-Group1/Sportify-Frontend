const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { getUser } = require('./utils');

Given(/^the user is at the profile page$/, async function () {
    let profileButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'PROFILE')]")));
    await this.driver.executeScript('arguments[0].click();', profileButton);
});

When(/^the user presses on the \"Delete account\" button$/, async function () {
    let deleteAccountButton = await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Delete Account')]")));
    await this.driver.executeScript('arguments[0].click();', deleteAccountButton);
})

When(/^the user confirms to delete account$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    await this.driver.switchTo().alert().accept();
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

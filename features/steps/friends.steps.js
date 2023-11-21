const { Given, When, Then } = require("cucumber");
const { By, until } = require('selenium-webdriver');
const { addFriend } = require('./utils');

Given(/^(.*) has friends (.*)$/, async function (username, friendsCommaSeparated) {
    await Promise.all(friendsCommaSeparated.split(",").map(async friend => {
        await addFriend(username, friend);
    }));
});

When(/^the user navigates to the friends page$/, async function () {
    const friendsButton = await this.driver.findElement(By.xpath("//*[contains(text(), 'FRIENDS')]"));
    await this.driver.executeScript('arguments[0].click();', friendsButton);
});

Then(/^the system should display the list of friends (.*)$/, async function (friendsCommaSeparated) {
    await Promise.all(friendsCommaSeparated.split(",").map(async friend => {
        await this.driver.findElement(By.xpath(`//*[contains(text(), '${friend}')]`));
    }));
});
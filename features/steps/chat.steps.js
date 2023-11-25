const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { createChat, addFriend, createUser } = require("./utils");

Given(/^the user (.*) has chats with (.*)$/, async function (username, usernamesCommaSeparated) {
    await Promise.all(usernamesCommaSeparated.split(",").map(async username2 => {
        await createUser(username2, '12345678');
        await addFriend(username, username2);
        await createChat(username, username2);
    }));
});

When(/^the user enters the chats page$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[text()='CHAT']")))
    const chatsButton = await this.driver.findElement(By.xpath("//*[text()='CHAT']"));
    await this.driver.executeScript('arguments[0].click();', chatsButton);
});

Then(/^the user should be able to see the list of chat channels with (.*) respectively$/, async function (usernamesCommaSeparated) {
    await Promise.all(usernamesCommaSeparated.split(",").map(async username => {
        await this.driver.wait(until.elementLocated(By.xpath(`//*[text()='${username}']`)));
    }));
});

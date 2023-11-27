const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { createChat, addFriend, createUser, createMessage } = require("./utils");

Given(/^the user (.*) has chats with (.*)$/, async function (username, usernamesCommaSeparated) {
    await Promise.all(usernamesCommaSeparated.split(',').map(async username2 => {
        await createUser(username2, '12345678');
        await addFriend(username, username2);
        await createChat(username, username2);
    }));
});

Given(/^the users (.*) and (.*) have messages (.*)$/, async function (username1, username2, messagesCommaSeparated) {
    await Promise.all(
        messagesCommaSeparated.split(',')
        .map(usernameMessageColonSeparated => {
            const usernameContent = usernameMessageColonSeparated.split(':');
            return (usernameContent[0], usernameContent[1]);
        })
        .map(async (sender, content) => {
            await createUser(username2, '12345678');
            await addFriend(username1, username2);
            await createChat(username1, username2);
            await createMessage(sender, sender == username1 ? username2 : username1, content);
        })
    )
});

When(/^the user enters the chats page$/, async function () {
    await this.driver.wait(until.elementLocated(By.id('chat-tab')))
    const chatsButton = await this.driver.findElement(By.id('chat-tab'));
    await this.driver.executeScript('arguments[0].click();', chatsButton);
});

Then(/^the user should be able to see the list of chat channels with (.*) respectively$/, async function (usernamesCommaSeparated) {
    await Promise.all(usernamesCommaSeparated.split(",").map(async username => {
        await this.driver.wait(until.elementLocated(By.xpath(`//*[text()='${username}']`)));
    }));
});

Given(/^the user enters the chat page with (.*)$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.id(`message-button-${username}`)));
    const messageButton = await this.driver.findElement(By.id(`message-button-${username}`));
    await this.driver.executeScript('arguments[0].click();', messageButton);
});

When(/^the user enters the message (.*)$/, async function (message) {
    await this.driver.findElement(By.id('message-input')).sendKeys(message);
});

When(/^the user sends the message$/, async function () {
    await this.driver.wait(until.elementLocated(By.id(`send-button`)));
    const sendButton = await this.driver.findElement(By.id(`send-button`));
    await this.driver.executeScript('arguments[0].click();', sendButton);
});

Then(/^the user should be able to see the message (.*) at the chat page$/, async function (message) {
    await this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${message}')]`)));
});

Then(/^the user (.*) should be able to see the message (.*) at the chat page with (.*)$/, async function (username, message, username2) {
    await this.driver.wait(until.elementLocated(By.id('profile-tab')));
    const profileButton = await this.driver.findElement(By.id('profile-tab'));
    await this.driver.executeScript('arguments[0].click();', profileButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[text()='Logout']")));
    const logoutButton = await this.driver.findElement(By.xpath("//*[text()='Logout']"));
    await this.driver.executeScript('arguments[0].click();', logoutButton);

    const usernameInput = await this.driver.findElement(By.id('username-text-input'));
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
    const passwordInput = await this.driver.findElement(By.id('password-text-input'));
    await passwordInput.clear();
    await passwordInput.sendKeys('12345678');
    const loginButton = await this.driver.findElement(By.id('login-button'));
    await this.driver.executeScript('arguments[0].click();', loginButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'EXPLORE')]")));

    await this.driver.wait(until.elementLocated(By.id('chat-tab')));
    const chatsButton = await this.driver.findElement(By.id('chat-tab'));
    await this.driver.executeScript('arguments[0].click();', chatsButton);

    await this.driver.wait(until.elementLocated(By.id(`message-button-${username2}`)));
    const messageButton = await this.driver.findElement(By.id(`message-button-${username2}`));
    await this.driver.executeScript('arguments[0].click();', messageButton);

    // TODO
});

Then(/^the system should display messages (.*)$/, async function (messagesCommaSeparated) {
    await Promise.all(
        messagesCommaSeparated.split(',')
        .map(usernameMessageColonSeparated => {
            const usernameContent = usernameMessageColonSeparated.split(':');
            return (usernameContent[0], usernameContent[1]);
        })
        .map(async (sender, content) => {
            // TODO
        })
    )
});
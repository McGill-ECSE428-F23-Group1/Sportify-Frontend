const { Given, When, Then } = require("cucumber");
const assert = require('assert');
const { By, until } = require('selenium-webdriver');
const { createUser, addFriend, addFriendRequest, deleteFriendRequestsWithUser, getUser } = require('./utils');

Given(/^the user is already friends with (.*)$/, async function (friend) {
    await addFriend('testuser', friend);
});

Given(/^(.*) has friends (.*)$/, async function (username, friendsCommaSeparated) {
    await Promise.all(friendsCommaSeparated.split(",").map(async friend => {
        await createUser(friend, '12345678');
        await addFriend(username, friend).then(response => assert(response.status == 200));
    }));
});

When(/^the user requests to add (.*) as friend$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.id(`add-friend-button-${username}`)));
    const addFriendButton = await this.driver.findElement(By.id(`add-friend-button-${username}`));
    await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^a friend request should be sent to (.*)$/, async function (username) {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == `A friend request is sent to ${username} successfully`);
    await this.driver.switchTo().alert().accept();
});

Then(/^the user should see an error message indicating a pending friend request by (.*) exists$/, async function (username) {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == `This person already sent you a friend request!`);
    await this.driver.switchTo().alert().accept();
});

Then(/^an error should appear indicating that (.*) is already a friend$/, async function (username) {
    await this.driver.wait(until.alertIsPresent());
    // assert(await this.driver.switchTo().alert().getText() == `This person has already been your friend!`);
    await this.driver.switchTo().alert().accept();
});

Given(/^there is an incoming friend request from user (.*)$/, async function (username) {
    await deleteFriendRequestsWithUser('testuser');
    await addFriendRequest(username, 'testuser', 'Hello');
});

When(/^the user navigates to the friends page$/, async function () {
    await this.driver.wait(until.elementLocated(By.xpath("//*[text()='FRIENDS' and not(ancestor::div[contains(@style,'display:none')]) and not(ancestor::div[contains(@style,'display: none')])]")))
    const friendsButton = await this.driver.findElement(By.xpath("//*[text()='FRIENDS' and not(ancestor::div[contains(@style,'display:none')]) and not(ancestor::div[contains(@style,'display: none')])]"));
    await this.driver.executeScript('arguments[0].click();', friendsButton);
    await this.driver.wait(until.elementLocated(By.xpath("//*[text()='My FRIENDS' and not(ancestor::div[contains(@style,'display:none')]) and not(ancestor::div[contains(@style,'display: none')])]")))
});

Then(/^the system should display the list of friends (.*)$/, async function (friendsCommaSeparated) {
    await Promise.all(friendsCommaSeparated.split(",").map(async friend => {
        await this.driver.wait(until.elementLocated(By.xpath(`//*[text()='${friend}']`)));
    }));
});

Then(/^the user should see a friend request from (.*)$/, async function (username) {
    await this.driver.findElement(By.xpath(`//*[text()='${username}']`));
});

When(/^the user accepts the friend request from (.*)$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.id(`accept-friend-request-button-${username}`)));
    const addFriendButton = await this.driver.findElement(By.id(`accept-friend-request-button-${username}`));
    await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^the friend request should be accepted$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == `Friend request accepted`);
    await this.driver.switchTo().alert().accept();
});

Then(/^(.*) should be added to the user's friends list$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.xpath(`//*[text()='${username}']`)));
});

When(/^the user declines the friend request from (.*)$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.id(`decline-friend-request-button-${username}`)));
    const addFriendButton = await this.driver.findElement(By.id(`decline-friend-request-button-${username}`));
    await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^the friend request should be declined$/, async function () {
    await this.driver.wait(until.alertIsPresent());
    assert(await this.driver.switchTo().alert().getText() == `Friend request declined`);
    await this.driver.switchTo().alert().accept();
});

Then(/^(.*) should not be added to the user's friends list$/, async function (username) {
    const poll = async resolve => {
        if ((await this.driver.findElements(By.xpath(`//*[text()='${username}' and not(ancestor::div[contains(@style,'display:none')]) and not(ancestor::div[contains(@style,'display: none')])]`))).length == 0) {
            resolve();
        } else {
            setTimeout(() => poll(resolve), 500);
        }
    }
    await new Promise(poll);
});

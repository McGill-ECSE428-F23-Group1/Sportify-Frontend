const { Given, When, Then } = require("cucumber");
const { By, until } = require('selenium-webdriver');
const { addFriend, addFriendRequest, deleteFriendRequestsWithUser } = require('./utils');

Given(/^the user is already friends with (.*)$/, async function (friend) {
    await addFriend('testuser', friend);
});

Given(/^(.*) has friends (.*)$/, async function (username, friendsCommaSeparated) {
    await Promise.all(friendsCommaSeparated.split(",").map(async friend => {
        await addFriend(username, friend);
    }));
});

When(/^the user requests to add (.*) as friend$/, async function (username) {
    await this.driver.wait(until.elementLocated(By.id(`add-friend-button-${username}`)));
    const addFriendButton = await this.driver.findElement(By.id(`add-friend-button-${username}`));
    await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^a friend request should be sent to (.*)$/, async function (username) {
    // TODO
});

Then(/^the user should see an error message indicating a pending friend request by (.*) exists$/, async function (username) {
    // TODO
});

Then(/^an error should appear indicating that (.*) is already a friend$/, async function (username) {
    // TODO
});

Given(/^there is an incoming friend request from user (.*)$/, async function (username) {
    await deleteFriendRequestsWithUser('testuser');
    await addFriendRequest('testuser', username);
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
    // TODO
    // await this.driver.wait(until.elementLocated(By.id(`accept-friend-request-button-${username}`)));
    // const addFriendButton = await this.driver.findElement(By.id(`accept-friend-request-button-${username}`));
    // await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^the friend request should be accepted$/, async function () {
    // TODO
});

Then(/^(.*) should be added to the user's friends list$/, async function (username) {
    // TODO
});

When(/^the user declines the friend request from (.*)$/, async function (username) {
    // TODO
    // await this.driver.wait(until.elementLocated(By.id(`decline-friend-request-button-${username}`)));
    // const addFriendButton = await this.driver.findElement(By.id(`decline-friend-request-button-${username}`));
    // await this.driver.executeScript('arguments[0].click();', addFriendButton);
});

Then(/^the friend request should be declined$/, async function () {
    // TODO
});

Then(/^(.*) should not be added to the user's friends list$/, async function (username) {
    // TODO
});

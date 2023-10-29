Feature: Delete account

As a user
I would like to delete my account
So that I can disengage from the application and remove my personal information when I would like to

Scenario: Delete account (Normal flow)

Given the user with username <username> is logged in
And   the user is at the profile page
When the user presses on the "Delete account" button
And  the user confirms to delete account
Then the account with username <username> should be deleted successfully

| username |
| Ze Yuan  |
| Zhekai   |

Scenario: Delete account (Alternate flow)

Given the user with username <username> is logged in
And   the user is at the profile page
When the user presses on the "Delete account" button
And  the user cancels deleting account
Then the account with username <username> should be kept

| username |
| Yicheng  |
| Shaun    |

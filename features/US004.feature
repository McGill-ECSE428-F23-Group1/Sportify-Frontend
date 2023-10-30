Feature: Edit account information

As a user
I would like to edit my account information
So that I can keep it up-to-date

Scenario Outline: Edit account information (Normal flow)

Given the user with username <username> is logged in
And   the user is at the profile page
When the user updates password to <password>, gender to <gender>, and sports to <sports>
And  the user presses on the "Save" button
Then the user with username <username> should have password <password>, gender <gender>, and sports <sports>

Examples:
| username | password | gender | sports                              |
| Chenxin  | chenXin8 | Male   | Soccer:Proficient                   |
| Neel     | neel5678 | Male   | Soccer:Intermediate,Soccer:Beginner |

Feature: Edit account information

As a user
I would like to edit my account information
So that I can keep it up-to-date

Scenario Outline: Edit account information (Normal flow)

Given the user with username <username> is logged in
And   the user is at the profile page
When the user updates username to <newUsername>, password to <password>, gender to <gender>, and sports to <sports>
And  the user presses on the "Save" button
Then the information should be updated successfully

Examples:
| username | newUsername | password | gender | sports                              |
| Chenxin  | ChenXin     | chenXin8 | Male   | Soccer:Proficient                   |
| Neel     | Neel        | neel5678 | Male   | Soccer:Intermediate,Soccer:Beginner |

Scenario Outline: Edit account information with existing username (Error flow)

Given the user with username <username> is logged in
And   the user is at the profile page
And   there exists another user with username <newUsername>
When the user updates username to <newUsername>, password to <password>, gender to <gender>, and sports to <sports>
And  the user presses on the "Save" button
Then an error should appear showing that the username already exists

Examples:
| username | newUsername | password | gender | sports                              |
| Chenxin  | Neel        | chenXin8 | Male   | Soccer:Proficient                   |
| Neel     | Ze Yuan     | zeyuan78 | Male   | Soccer:Intermediate,Soccer:Beginner |

Feature: Create account

As a user
I would like to create an account
So that I can get the full functionality of the app

Scenario Outline: Create an account (Normal flow)

Given the user is at the login/signup page
When the user enters username <username> and password <password>
And  the user presses the "Register" button
Then the user should be brought to the home page

Examples:
| username | password |
| Irfan    | Irfan    |
| Chenxin  | Chenxin  |

Scenario Outline: Create an account with existing username (Error flow)

Given the user is at the login/signup page
And   there exists a user with username <username>
When the user enters username <username> and password <password>
And  the user presses the "Register" button
Then an error should appear showing that the username already exists

Examples:
| username | password |
| Neel     | Neel     |
| Ze Yuan  | ZeYuan   |

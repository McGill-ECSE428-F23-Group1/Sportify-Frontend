Feature: Log in

As a user
I would like to log in to my account
So that I can access the complete functionality of the app

Scenario Outline: Log in with correct username and password (Normal flow)

Given the user is at the login/signup page
And   there exists a user with username <username> and password <password>
When the user enters username <username> and password <password>
And  the user presses the "Log In" button
Then the user should be brought to the home page

Examples:
| username | password |
| Zhekai   | Zhekai   |
| Yicheng  | Yicheng  |

Scenario Outline: Log in with nonexistent username (Error flow)

Given the user is at the login/signup page
And   there does not exist a user with username <username>
When the user enters username <username> and password <password>
And  the user presses the "Log In" button
Then an error should appear showing that the username does not exist

Examples:
| username | password |
| Shaun    | Shaun    |
| Krishna  | Krishna  |

Scenario Outline: Log in with existent username and incorrect password (Error flow)

Given the user is at the login/signup page
And   there exists a user with username <username> and password <password>
When the user enters username <username> and password <incorrectPassword>
And  the user presses the "Log In" button
Then an error should appear showing that the password is incorrect

Examples:
| username | password | incorrectPassword |
| Weiheng  | Weiheng  | weiheng           |
| Jimmy    | Jimmy    | jimmy             |

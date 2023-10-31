Feature: Edit account information

As a user
I would like to edit my account information
So that I can keep it up-to-date

Scenario Outline: Edit account information (Normal flow)

Given a user with username <username>, gender <gender>, and sports <sports> is logged in
And   the user is at the profile page
When the user updates password to <newPassword>, gender to <newGender>, and sports from <sports> to <newSports>
And  the user presses on the "Save" button
Then the user with username <username> should have password <newPassword>, gender <newGender>, and sports <newSports>

Examples:
| username | password | gender | sports                                  | newPassword | newGender | newSports                               |
| Chenxin  | chenXin8 | Male   | Football:Intermediate                   | chenxin8    | Male      | Football:Advanced                       |
| Neel     | neel5678 | Male   | Football:Intermediate,Swimming:Beginner | Neel5678    | Male      | Football:Intermediate,Swimming:Advanced |

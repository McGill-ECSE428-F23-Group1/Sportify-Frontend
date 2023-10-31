Feature: Check account information

As a user
I would like to check my account information
So that I can verify the information is correct and up-to-date

Scenario Outline: Check account information (Normal flow)

Given a user with username <username>, gender <gender>, and sports <sports> is logged in
When the user is at the profile page
Then the page should show the username <username>, gender <gender>, and sports <sports>

Examples:
| username | gender | sports                                    |
| Mia      | Female | Football:Intermediate,Tennis:Beginner     |
| Irfan    | Male   | Football:Intermediate,Basketball:Advanced |

Feature: View all players

As a user
I would like to view all players in the system
so that use the app to find other players with similar profiles to myself

Scenario Outline: View all players

Given the system has players <players>
And   the user is logged in
When the user enters the explore page
Then the system should display the list of players <players>

Examples:
| players                                |
| Ethan,Irfan,Louis,Neel,Zhekai          |
| Shaun,Chenxin,Jimmy,Krishna,Mia,Zeyuan |

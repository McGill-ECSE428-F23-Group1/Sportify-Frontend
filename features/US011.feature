Feature: Viewing chat channels

As a user
I would like to all chats with all users in a single page
so that I can keep track of my communication channels

Scenario Outline: Viewing all chat channels

Given the user with username <username> is logged in
And   the user <username> has chats with <usernames>
When  the user enters the chats page
Then  the user should be able to see the list of chat channels with <usernames> respectively

Examples:
| username | friends                        |
| Louis    | Ethan,Irfan,Neel,Zhekai        |
| Chenxin  | Shaun,Jimmy,Krishna,Mia,Zeyuan |

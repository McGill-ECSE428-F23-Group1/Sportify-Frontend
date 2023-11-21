Feature: View all friends

As a user
I would like to view all my friends
so that I can easily find my friends and communicate with them

Scenario Outline: View all friends

Given the user with username <username> is logged in
And   <username> has friends <friends>
When  the user navigates to the friends page
Then  the system should display the list of friends <friends>

Examples:
| username | friends                          |
| Ethan    | Irfan,Louis,Neel,Zhekai          |
| Shaun    | Chenxin,Jimmy,Krishna,Mia,Zeyuan |

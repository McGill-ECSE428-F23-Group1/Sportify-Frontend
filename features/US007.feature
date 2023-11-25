Feature: Send Friend Requests

As a user
I would like to send friend requests
So that I can connect with other users through the app

Scenario Outline: Send a friend request to another user (Normal flow)

Given the user is logged in
And   the user enters the explore page
When the user requests to add <otherUsername> as friend
Then a friend request should be sent to <otherUsername>

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

Scenario Outline: Send a friend request to a user who already sent you a request (Error flow)

Given the user is logged in
And   there is an incoming friend request from user <otherUsername>
When the user requests to add <otherUsername> as friend
Then the user should see an error message indicating a pending friend request by <otherUsername> exists

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

Scenario Outline: Send a friend request to someone who is already a friend (Error flow)

Given the user is logged in
And   the user is already friends with <otherUsername>
When the user requests to add <otherUsername> as friend
Then an error should appear indicating that <otherUsername> is already a friend

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

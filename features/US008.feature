Feature: View and respond to friend requests

As a user
I would like to view and respond to friend requests
So that I can accept or decline friend requests as I wish.

Scenario Outline: Receive a friend request (Normal flow)

Given the user is logged in
And   there is an incoming friend request from user <otherUsername>
When the user navigates to the friends page
Then the user should see a friend request from <otherUsername>

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

Scenario Outline: Accept a friend request (Normal flow)

Given the user is logged in
And   there is an incoming friend request from user <otherUsername>
And   the user navigates to the friends page
When the user accepts the friend request from <otherUsername>
Then the friend request should be accepted
And  <otherUsername> should be added to the user's friends list

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

Scenario Outline: Decline a friend request (Alternate flow)

Given the user is logged in
And   there is an incoming friend request from user <otherUsername>
And   the user navigates to the friends page
When the user declines the friend request from <otherUsername>
Then the friend request should be declined
And   <otherUsername> should not be added to the user's friends list

Examples:
| otherUsername |
| Ethan         |
| Shaun         |

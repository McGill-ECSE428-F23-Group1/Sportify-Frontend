Feature: Send and receive messages

As a user
I would like to send and receive messages with other users
so that I can use the app to communicate with other players

Scenario Outline: Send and receive messages

Given the user with username <username1> is logged in
And   <username1> is friend with <username2>
When  the user enters the chats page
And   the user enters the chat page with <username2>
And   the user enters the message <message>
And   the user sends the message
Then  the user should be able to see the message <message> at the chat page
And   the user <username2> should be able to see the message <message> at the chat page with <username1>

Examples:
| username1 | username2 | message |
| Irfan     | Louis     | Hello   |
| Zhekai    | Neel      | Bonjour |

Scenario Outline: View message history

Given the user with username <username1> is logged in
And   <username1> is friend with <username2>
And   the users <username1> and <username2> have messages <messages>
When  the user enters the chats page
And   the user enters the chat page with <username2>
Then  the system should display messages <messages>

Examples:
| username1 | username2 | messages               |
| Jimmy     | Krishna   | Jimmy:Hi,Krishna:Hello |
| Mia       | Zeyuan    | Mia:Hello,Zeyuan:Salut |

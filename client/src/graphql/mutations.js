/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Creates new user
export const CreateUser = `mutation CreateUser($user: CreateUserInput!) {
    createUser(input: $user) {
        id
        username
        email
    }
}`;


// Links users, conversations and messages
export const CreateConvoLink = `
  mutation CreateConvoLink($input: CreateConvoLinkInput!) {
    createConvoLink(input: $input) {
      id
      convoLinkUserId
      convoLinkConversationId
      conversation {
        id
        name
      }
    }
  }
`;

// Creates new conversation between users
export const CreateConvo = `
  mutation CreateConvo($input: CreateConversationInput!) {
    createConvo(input: $input) {
      id
      name
      members
    }
  }
`;

// Creates new message
export const CreateMessage = `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input:$input) {
      id
      content
      authorId
      recieverId
      messageConversationId
      createdAt
    }
  }
`

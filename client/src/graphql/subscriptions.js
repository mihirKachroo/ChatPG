/* eslint-disable */
// this is an auto generated file. This will be overwritten

// subscription that acts when user is created
export const OnCreateUser = `
    subscription OnCreateUser {
        onCreateUser {
            id
            username
            createdAt
        }
    }
`
// subscription that acts when conversation is created
export const OnCreateUserConversation = `
  subscription OnCreateUserConversation($userId: ID!) {
    onCreateConvoLink(convoLinkUserId:$userId) {
      id
      convoLinkUserId
      convoLinkConversationId
      conversation {
        id
        name
      }
    }
  }
`
// subscription that acts when message is created
export const OnCreateMessage = `
  subscription OnCreateMessage($conversationId: ID!) {
    onCreateMessage(messageConversationId: $conversationId) {
      id
      content
      authorId
      messageConversationId
      createdAt
    }
  }
`
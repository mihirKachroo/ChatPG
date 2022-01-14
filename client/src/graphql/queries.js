/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Lists all users
export const ListUsers = `
    query ListUsers {
        listUsers {
            items {
                id
                username
                createdAt
            }
        }
    }
`;

// Gets id and username of user
export const GetUser = `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            username
            email
        }
    }
`;

// Gets user's id, name, conversations and the last message for each conversation
export const GetUserAndConversations = `
  query GetUserAndConversations($id:ID!) {
    getUser(id:$id) {
      id
      username
      conversations(limit: 100000) {
        items {
          id
          conversation {
            id
            name
            isSeen
            members
            createdAt
            messages(limit: 1, sortDirection:DESC) {
            items {
              id
              content
              authorId
              createdAt
              updatedAt
            }
          }
          }
        }
      }
    }
  }
`;

// Gets all messages in a conversation
export const GetConvo = `
  query GetConvo($id: ID!) {
    getConvo(id:$id) {
      id
      name
      members
      messages(limit: 1000000) {
        items {
          id
          content
          authorId
          messageConversationId
          createdAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

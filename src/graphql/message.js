import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query Query {
    messages
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      id
    }
  }
`;

export const NEW_MESSAGE_LISTENER = gql`
  subscription NewMessage {
    newMessage {
      id
      content
      seen
      createdAt
      updatedAt
      # sender {
      #   id
      #   fullname
      # }
      # receiver {
      #   id
      #   fullname
      # }
    }
  }
`;

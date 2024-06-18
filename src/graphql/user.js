import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
      fullname
      firstname
      lastname
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
      user {
        id
        avatar
        firstname
        lastname
        username
        gender
        bio
        phone
        email
        address
        portfolio_dir
        role
      }
    }
  }
`;

export const FILL_FREELANCER_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput) {
    updateProfile(input: $input)
  }
`;

export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      avatar
      firstname
      lastname
      fullname
      username
      gender
      password
      bio
      phone
      email
      address
      portfolio_dir
      role
      createdAt
      updatedAt
      skills {
        name
      }
      jobs {
        name
      }
      # feedbacks {

      # }
      balance {
        balance
      }
    }
  }
`;

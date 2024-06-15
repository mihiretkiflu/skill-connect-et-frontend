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

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
        id
        name
      }
      jobs {
        name
      }
      feedbacks {
        content
      }
      balance {
        balance
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(user_id: $id)
  }
`;

export const EDIT_USER = gql`
  mutation EditProfile($input: EditProfileInput) {
    editProfile(input: $input)
  }
`;

export const DEPOSIT_MONEY = gql`
  mutation DepositMoney($input: DepositMoneyInput) {
    depositMoney(input: $input)
  }
`;

export const BAN_USER = gql`
  mutation BanUser($id: Int!) {
    banUser(user_id: $id)
  }
`;

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

export const REQUEST_RESET_PWD = gql`
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`;

export const RESET_PWD = gql`
  mutation ResetPassword(
    $email: String!
    $resetToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetToken: $resetToken
      newPassword: $newPassword
    )
  }
`;

export const BAN_USER = gql`
  mutation BanUser($userId: Int!, $ban: Boolean!) {
    banUser(user_id: $userId, ban: $ban)
  }
`;

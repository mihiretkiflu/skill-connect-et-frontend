import { gql } from "@apollo/client";

export const GET_CONTRACTS = gql`
  query Contracts {
    contracts {
      id
      status
      start_date
      deadline_date
      offered_amount
      final_amount
      createdAt
      updatedAt
      # freelancer {

      # }
      # employer {

      # }
      # job {

      # }
      # payment {

      # }
    }
  }
`;
export const CREATE_CONTRACT = gql`
  mutation CreateContract($input: CreateContractInput) {
    createContract(input: $input) {
      id
    }
  }
`;

export const CONTRACT_ACCEPTED = gql`
  mutation CreateContract($input: CreateContractInput) {
    createContract(input: $input) {
      id
    }
  }
`;

export const CONTRACT_REQUESTED = gql`
  subscription ContractRequested {
    contractRequested {
      id
      status
      start_date
      deadline_date
      offered_amount
      final_amount
      createdAt
      updatedAt
      # freelancer {

      # }
      # employer {

      # }
      # job {

      # }
      # payment {

      # }
    }
  }
`;

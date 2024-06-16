import { gql } from "@apollo/client";

export const GET_EMPLOYER_CONTRACTS = gql`
  query EmployerContracts {
    employerContracts {
      id
      status
      start_date
      deadline_date
      offered_amount
      final_amount
      createdAt
      updatedAt
      freelancer {
        id
        fullname
      }

      job {
        id
        description
        name
      }
      payment {
        id
        amount
        status
        tx_ref
        checkout_url
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_MY_CONTRACTS = gql`
  query FreelancerContracts {
    freelancerContracts {
      id
      status
      start_date
      deadline_date
      offered_amount
      final_amount
      createdAt
      employer {
        id
        fullname
        avatar
      }
      job {
        id
        name
        description
      }
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

export const ACCEPT_REJECT_CONTRACT = gql`
  mutation AcceptContract($input: AcceptContractInput) {
    acceptContract(input: $input) {
      id
      status
      start_date
      deadline_date
      offered_amount
      final_amount
      createdAt
      updatedAt
    }
  }
`;

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

export const JOB_PROGRESS = gql`
  mutation JobProgress($input: JobProgressInput!) {
    jobProgress(input: $input) {
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

export const CONFIRM_PAYMENT = gql`
  mutation ConfirmPayment($input: ConfirmPaymentInput!) {
    confirmPayment(input: $input)
  }
`;

export const APPROVE_RELEASE_FUND = gql`
  mutation ApproveJobReleaseFund($input: JobProgressInput!) {
    approveJobReleaseFund(input: $input)
  }
`;

export const CONTRACT_ACCEPTED = gql`
  subscription ContractAccepted {
    contractAccepted {
      id
    }
  }
`;

export const CONTRACT_STARTED = gql`
  subscription ContractStarted {
    contractStarted {
      id
    }
  }
`;

export const CONTRACT_REQUESTED = gql`
  subscription ContractRequested {
    contractRequested {
      id
    }
  }
`;

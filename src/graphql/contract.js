import { gql } from "@apollo/client";

export const CREATE_CONTRACT = gql`
  mutation CreateContract($input: CreateContractInput) {
    createContract(input: $input) {
      id
    }
  }
`;

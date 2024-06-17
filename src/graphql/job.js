import { gql } from "@apollo/client";

export const POST_PROJECT_LOOKUPS = gql`
  query AddJobLookups {
    skills {
      id
      name
    }
  }
`;

export const POST_PROJECT = gql`
  mutation CreateJob($input: CreateJobInput) {
    createJob(input: $input) {
      id
    }
  }
`;
export const CLOSE_JOB = gql`
  mutation CloseJob($closeJobId: Int!) {
    closeJob(id: $closeJobId)
  }
`;

export const JOBS = gql`
  query Jobs {
    Jobs {
      id
      name
      description
      posted_date
      createdAt
      skill {
        name
      }
      applications {
        id
      }
      employer_id
    }
  }
`;

export const APPLY_FOR_JOB = gql`
  mutation ApplyForJob($input: ApplyingInput) {
    applyForJob(input: $input) {
      id
    }
  }
`;

export const MY_JOBS = gql`
  query MyJobs {
    myJobs {
      id
      name
      description
      posted_date
      createdAt
      updatedAt

      skill {
        name
      }
      applications {
        id
        price_offer
        about_freelancer
        createdAt
        freelancer {
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
          # skills {
          #   keyskill
          # }
          # jobCategories {
          #   name
          # }
        }
      }
      employer_id
    }
  }
`;

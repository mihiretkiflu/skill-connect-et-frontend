import { gql } from "@apollo/client";

export const DASHBOARD_STATS = gql`
  query DashboardStats {
    dashboardStats {
      clientsCount
      freelancersCount
      jobsCount
      contractsCount
      applicationsCount
      transactionsCount
      recentTransactions {
        id
        from
        to
        amount
        status
      }
    }
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
      updatedAt

      skill {
        name
      }
      applications {
        id
      }
      employer {
        id
        fullname
      }
    }
  }
`;
export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const FRELELANCERS = gql`
  query DashboardStats {
    dashboardStats {
      freelancers {
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
        #   name
        # }
      }
    }
  }
`;
export const EMPLOYERS = gql`
  query Employers {
    employers {
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
    }
  }
`;

import gql from "graphql-tag";

export const FETCH_USERS = gql`
  {
    users {
      username
      name
    }
  }
`;

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

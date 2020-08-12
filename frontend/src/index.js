import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import App from './components/App';
import { VERIFY_USER } from './gql/mutations';

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql"
});

// make sure we log any additional errors we receive
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const token = localStorage.getItem("auth-token");

// to avoid components async problems where
// a component would try to read the cache's value of isLoggedIn
// before our mutation goes through we can set it up here
cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

// then if we do have a token we'll go through with our mutation
if (token) {
  client
    // use the VERIFY_USER mutation directly use the returned data to know if the returned
    // user is loggedIn
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}

const Root = () => {
  return (
    <HashRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: (token) => ({
      authorization: token ? `Bearer ${token}` : "",
    }),
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
  connectToDevTools: true,
});

export default function AuthWrapper() {
  const { token } = useSelector((state) => state.auth);

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/subscription",
      connectionParams: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  apolloClient.setLink(splitLink);

  return (
    <ApolloProvider client={apolloClient}>
      <Outlet />
    </ApolloProvider>
  );
}

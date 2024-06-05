import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: (token) => ({
      authorization: token ? `Bearer ${token}` : "",
    }),
  }),
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
      uri: "http://localhost:5000/graphql",
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

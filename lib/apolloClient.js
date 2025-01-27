// lib/apolloClient.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta", // Pokémon GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;

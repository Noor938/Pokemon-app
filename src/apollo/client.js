import { ApolloClient, InMemoryCache } from "@apollo/client";

// Creating an ApolloClient instance to connect to the Pokémon GraphQL API
const client = new ApolloClient({
  // The URL provided in the assignment pointed to v7, which is no longer supported.
  // Therefore, I have shifted to using v8 of the Pokémon GraphQL API.
  uri: "https://graphqlpokemon.favware.tech/v8", // Use Pokémon API v8
  cache: new InMemoryCache(),
});

export default client;

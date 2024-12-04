import { createContext, useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";

const ApolloContext = createContext();

export const ApolloContextProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export const useApollo = () => useContext(ApolloContext);

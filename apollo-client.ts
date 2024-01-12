import { ApolloServer } from "@apollo/server";
import { InMemoryCache } from "@apollo/server";

let client: ApolloServer<any> | null = null;

export const getClient = () => {
  const client = new ApolloServer({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
  });
};

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
    uri: "https://kastelstari.stepzen.net/api/ill-tortoise/__graphql",
    headers: {
        Authorization: "apikey kastelstari::stepzen.net+1000::7188fff3837d51fb82fa6dab46ee2a01bb061c92e99d9d1ffc1436322b9001f7"
    },
    cache: new InMemoryCache()
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider;
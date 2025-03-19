import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { TrackAPI } from "./datasources/TrackApi.js";
import { DataSourceContext } from "./context.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const cache = server.cache;
    return {
      dataSources: {
        trackAPI: new TrackAPI({ cache }),
      },
    } satisfies DataSourceContext;
  },
});

console.log(`🚀  Server ready at: ${url}`);

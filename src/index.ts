import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    doctors: [Doctor!]!
  }
  type Doctor {
    name: String
    speciality: Speciality
  }

  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;

const doctorsData = [
  {
    id: "1",
    name: "Samia Mekame",
    speciality: "OPHTALMOLOGIST",
  },
  {
    id: "2",
    name: "Catherine Bedoy",
    speciality: "PSYCHOLOGIST",
  },
];

const resolvers = {
  Query: {
    doctors: () => doctorsData,
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
   
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
   
  console.log(`🚀  Server ready at: ${url}`);

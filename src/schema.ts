import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    doctors(specialities: [Speciality!]): [Doctor]
    doctor(id: ID!): Doctor
    add(number1: Float!, number2: Float!): Float!
    substract(number1: Float!, number2: Float!): Float!
    multiply(number1: Float!, number2: Float!): Float!
    divide(number1: Float!, number2: Float!): Float
    closestColor(color: String!): String
    getTracks: [Track!]!
    getFilms: [Film!]!
    getPeople: [People!]!
  }

  type Doctor {
    id: ID!
    name: String!
    speciality: Speciality
  }

  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    numberOfViews: Int
    numberOfLikes: Int
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Film {
    id: ID!
    title: String
    people: [People]!
  }

  type People {
    id: ID!
    name: String
    eyeColor: String
    films: [Film]!
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    incrementTrackLikes(id: ID!): IncrementTrackLikesResponse!
  }

  type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  type IncrementTrackLikesResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }
`;

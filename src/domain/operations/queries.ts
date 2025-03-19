import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../types.js";

export const operationQueries: QueryResolvers = {
  add: (_, { number1, number2 }) => {
    return number1 + number2;
  },
  substract: (_, { number1, number2 }) => {
    return number1 - number2;
  },
  multiply: (_, { number1, number2 }) => {
    return number1 * number2;
  },
  divide: (_, { number1, number2 }) => {
    if (number2 === 0) {
      throw new GraphQLError("Impossible de diviser par 0");
    }
    return number1 / number2;
  },
};

import { doctorsData } from "./datasources/doctors.js";
import { colorsData } from "./datasources/colors.js";
import closestColor from "./functions/color.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    doctors: (_, { specialities }) => {
      return doctorsData.filter((el) => specialities.includes(el.speciality));
    },
    doctor: (_, { id }) => {
      return doctorsData.find((el) => el.id === id);
    },
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
        throw new GraphQLError('Impossible de diviser par 0')
      }
      return number1 / number2;
    },
    closestColor: (_, { color }) => {
      return closestColor(color, colorsData);
    },
  },
};

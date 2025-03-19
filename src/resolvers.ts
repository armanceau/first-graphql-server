import { doctorsData } from "./datasources/doctors.js";
import { colorsData } from "./datasources/colors.js";
import closestColor from "./functions/color.js";
import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
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
        throw new GraphQLError("Impossible de diviser par 0");
      }
      return number1 / number2;
    },
    closestColor: (_, { color }: { color: string }) => {
      if (!color.match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError("Couleur invalide");
      }
      return closestColor(color, colorsData);
    },
    getTracks: (_, __, { dataSources }, ___) => {
      return dataSources.trackAPI.getTracks();
    },
    getFilms: (_, __, { dataSources }, ___) => {
      return dataSources.filmAPI.getFilms();
    },
    getPeople: (_, __, { dataSources }, ___) => {
      return dataSources.filmAPI.getPeople();
    },
  },
  Track: {
    author: (parent, _, { dataSources }) =>
      dataSources.trackAPI.getAuthorBy(parent.authorId),
  },
  Film: {
    people: ({ people }, _, { dataSources }) =>
      dataSources.filmAPI.getPeopleByUrls(people),
  },
  People: {
    eyeColor: ({ eye_color }) => eye_color,
    films: ({ films }, _, { dataSources }) =>
      dataSources.filmAPI.getFilmByUrls(films),
  },
  Mutation: {
    async incrementTrackViews(_, { id }, context, info) {
      try {
        const track = await context.dataSources.trackAPI.incrementTrackViews(
          id
        );
        const message = `Successfully incremented number of views for track ${id}`;

        return {
          code: 200,
          message,
          success: Boolean(track),
          track,
        };
      } catch (err) {
        return {
          code: 304,
          message:
            (err as Error)?.message ??
            "Resource not modified, an internal error occured",
          success: false,
          track: null,
        };
      }
    },

    async incrementTrackLikes(_, { id }, context, info) {
      try {
        const track = await context.dataSources.trackAPI.incrementTrackLikes(
          id
        );
        const message = `Successfully incremented number of likes for track ${id}`;

        return {
          code: 200,
          message,
          success: Boolean(track),
          track,
        };
      } catch (err) {
        return {
          code: 304,
          message:
            (err as Error)?.message ??
            "Resource not modified, an internal error occured",
          success: false,
          track: null,
        };
      }
    },
  },
};

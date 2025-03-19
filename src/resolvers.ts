import { Resolvers } from "./types.js";
import { doctorQueries } from "./domain/doctors/queries.js";
import { operationQueries } from "./domain/operations/queries.js";
import { colorQueries } from "./domain/color/queries.js";
import { TrackQueries } from "./domain/track/queries.js";
import { TrackResolver } from "./domain/track/models.js";

export const resolvers: Resolvers = {
  Query: {
    ...doctorQueries,
    ...operationQueries,
    ...colorQueries,
    ...TrackQueries,

    getFilms: (_, __, { dataSources }, ___) => {
      return dataSources.filmAPI.getFilms();
    },
    getPeople: (_, __, { dataSources }, ___) => {
      return dataSources.filmAPI.getPeople();
    },
  },
  Track: TrackResolver,
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

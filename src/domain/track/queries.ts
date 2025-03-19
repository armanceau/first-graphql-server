import { QueryResolvers } from "../../types.js";

export const TrackQueries: QueryResolvers = {
  getTracks: (_, __, { dataSources }, ___) => {
    return dataSources.trackAPI.getTracks();
  },
};

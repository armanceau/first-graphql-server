import { TrackResolvers } from "../../types.js";

export const TrackResolver: TrackResolvers = {
  author: (parent, _, { dataSources }) =>
    dataSources.trackAPI.getAuthorBy(parent.authorId),
};

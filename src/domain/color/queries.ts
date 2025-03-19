import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../types.js";
import closestColor from "./color.js";
import { colorsData } from "../../datasources/colors.js";

export const colorQueries: QueryResolvers = {
  closestColor: (_, { color }: { color: string }) => {
    if (!color.match(/^#[0-9a-fA-F]{6}/)) {
      throw new GraphQLError("Couleur invalide");
    }
    return closestColor(color, colorsData);
  },
};

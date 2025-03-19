import { TrackAPI } from "./datasources/TrackApi";
import { FilmApi } from "./datasources/FilmApi";
import { AuthenticatedUser } from "./modules/auth.js";
import { PrismaClient } from "@prisma/client";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
    filmAPI: FilmApi;
    db: PrismaClient;
  };
  user: AuthenticatedUser | null;
};

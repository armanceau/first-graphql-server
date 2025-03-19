import { TrackAPI } from "./datasources/TrackApi";
import { FilmApi } from "./datasources/FilmApi";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
    filmAPI: FilmApi;
  };
};

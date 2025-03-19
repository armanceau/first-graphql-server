import { TrackAPI } from "./datasources/TrackApi";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
  };
};

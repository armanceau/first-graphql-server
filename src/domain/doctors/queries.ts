import { doctorsData } from "../../datasources/doctors.js";
import { QueryResolvers } from "../../types.js";

export const doctorQueries: QueryResolvers = {
  doctors: (_, { specialities }) => {
    return doctorsData.filter((el) => specialities.includes(el.speciality));
  },
  doctor: (_, { id }) => {
    return doctorsData.find((el) => el.id === id);
  },
};

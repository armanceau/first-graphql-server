import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";
import { WithRequired } from "../utils/mapped-types.js";
import { GraphQLError } from "graphql";

type UserMutations = WithRequired<MutationResolvers, "createUser" | "signIn">;

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { username, password },
  { dataSources },
  __
) => {
  try {
    const createdUser = await dataSources.db.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });
    return {
      code: 201,
      message: "the user has been created",
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username,
      },
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        code: 401,
        message: e.message,
        success: false,
        user: null,
      };
    }

    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      user: null,
    };
  }
};

const signIn: NonNullable<MutationResolvers["createUser"]> = async (
  _,
  { username, password },
  { dataSources: { db } },
  __
) => {
  try {
    const user = await db.user.findFirstOrThrow({ where: { username } });
    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      throw new GraphQLError("Someting wrong happened...");
    }

    const token = createJWT(user);

    return {
      code: 200,
      message: "the user authenticated",
      success: true,
      token,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        code: 401,
        message: e.message,
        success: false,
        token: null,
      };
    }
  }
};

export const userMutations: UserMutations = { createUser, signIn };

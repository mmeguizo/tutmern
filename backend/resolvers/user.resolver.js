import { users } from "../data/dummydata.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePic: gender === "male" ? boyprofilePic : girlprofilePic,
        });
        const savedUser = await newUser.save();
        await context.login(savedUser);
        return savedUser;
      } catch (error) {
        console.error("Error creating user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error logging in user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      let message = [];
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          console.error("Error destroying session, error: ", err);
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error logging out user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    updateUser: async (_, { input }, context) => {
      try {
        const { userId, ...update } = input;
        const updatedUser = await User.findByIdAndUpdate(userId, update, {});
        return updatedUser;
      } catch (error) {
        console.error("Error updating user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    users: async (_, __, context) => {
      // const users = await User.find({});
      // return users;
      if (!context.isAuthenticated()) {
        throw new Error("Unauthorized");
      }

      return await User.find({});
    },
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error fetching authenticated user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_, { userId }, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        return User.findById(userId);
      } catch (error) {
        console.error("Error fetching user, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    //  TODO => ADD USER/TRANSACTION RELATIONSHIP
  },
};

export default userResolver;

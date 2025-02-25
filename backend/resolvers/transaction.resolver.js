import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        const userId = context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error fetching transactions, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        // const userId = context.getUser()._id;
        // const transaction = await Transaction.findOne({
        const transaction = await Transaction.findOne({
          _id: transactionId,
          // userId,
        });
        console.log("transaction: ", transaction);
        return transaction;
      } catch (error) {
        console.error("Error fetching transaction, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    // TODO add category statistics resolver
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        console.log("context.getUser(): ", context.getUser());
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    updateTransaction: async (_, { input }, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        const { transactionId, ...update } = input;
        // const userId = context.getUser()._id;
        const updatedTransaction = await Transaction.findOneAndUpdate(
          { _id: transactionId },
          { ...update },
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction, error: ", error);
        throw new Error(error.message || "Internal server");
      }
    },

    deleteTransaction: async (_, { input }, context) => {
      try {
        if (!context.isAuthenticated()) {
          throw new Error("Unauthorized");
        }
        const { transactionId } = input;
        // const userId = context.getUser()._id;
        const deletedTransaction = await Transaction.findOneAndUpdate(
          { _id: transactionId },
          { isDeleted: true },
          { new: true }
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction, error: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default transactionResolver;

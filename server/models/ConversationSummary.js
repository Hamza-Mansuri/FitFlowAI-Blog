import mongoose from "mongoose";

const conversationSummarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationSummary = mongoose.model("ConversationSummary", conversationSummarySchema);

export default ConversationSummary;

const mongoose = require("mongoose");

const teamHistorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    image: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const TeamHistory = mongoose.model("TeamHistory", teamHistorySchema);
exports.TeamHistory = TeamHistory;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("likes", LikeSchema);

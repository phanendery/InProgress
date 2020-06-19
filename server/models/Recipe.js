const mongoose = require("mongoose");
const RecipeType = require("../schema/types/recipe_type");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  pictures: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("recipes", RecipeSchema);

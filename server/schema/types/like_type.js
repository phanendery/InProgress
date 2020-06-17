const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const Recipe = mongoose.model("recipes");
const User = mongoose.model("users");

const LikeType = new GraphQLObjectType({
  name: "LikeType",
  fields: () => ({
    _id: { type: GraphQLID },
    recipe: {
      type: require("./recipe_type"),
      resolver(parentValue) {
        return Recipe.findById(parentValue._id)
          .populate("recipe")
          .then((recipe) => {
            return recipe;
          });
      },
    },
    user: {
      type: require("./user_type"),
      resolver(parentValue) {
        return User.findById(parentValue._id)
          .populate("user")
          .then((user) => {
            return user;
          });
      },
    },
  }),
});

module.exports = LikeType;

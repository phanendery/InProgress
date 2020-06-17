const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const User = mongoose.model("users");
const Recipe = mongoose.model("recipes");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
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
    body: { type: GraphQLString },
  },
});

module.exports = CommentType;

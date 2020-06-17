require("../../models");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const RecipeType = require("./recipe_type");
const CommentType = require("./comment_type");
const LikeType = require("./like_type");

const User = mongoose.model("users");
const Recipe = mongoose.model("recipes");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      },
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve() {
        return Recipe.find({});
      },
    },
    recipe: {
      type: RecipeType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Recipe.findById(args._id);
      },
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve() {
        return Like.find({});
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve() {
        return Comment.find({});
      },
    },
  }),
});

module.exports = RootQueryType;

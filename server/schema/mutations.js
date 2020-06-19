const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;
const mongoose = require("mongoose");

const RecipeType = require("./types/recipe_type");
const LikeType = require("./types/like_type");
const CommentType = require("./types/comment_type");
const UserType = require("./types/user_type");

const Recipe = mongoose.model("recipes");
const Comment = mongoose.model("recipes");
const Like = mongoose.model("recipes");
const User = mongoose.model("users");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newRecipe: {
      type: RecipeType,
      args: {
        name: { type: GraphQLString },
        ingredients: { type: new GraphQLList(GraphQLString) },
        pictures: { type: new GraphQLList(GraphQLString) },
        userId: { type: GraphQLID },
      },
      resolve(_, { name, ingredients, pictures, userId }) {
        return new Recipe({ name, ingredients, pictures, userId }).save();
      },
    },
    deleteRecipe: {
      type: RecipeType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Recipe.remove({ _id });
      },
    },
    updateRecipe: {
      type: RecipeType,
      args: {
        recipeId: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: { type: new GraphQLList(GraphQLString) },
        pictures: { type: new GraphQLList(GraphQLString) },
      },
      resolve(_, { recipeId, name, ingredients, pictures }) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          { name, ingredients, pictures }
        );
      },
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { name, username, password }) {
        // return AuthService.register(args);
        return new User({ name, username, password }).save();
      },
    },
    newLike: {
      type: LikeType,
      args: {
        recipeId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(_, { recipeId, userId }) {
        return new Like({ recipeId, userId }).save();
      },
    },
  },
});

module.exports = mutation;

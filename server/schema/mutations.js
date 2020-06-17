const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const mongoose = require("mongoose");
const RecipeType = require("./types/recipe_type");

const Recipe = mongoose.model("recipes");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newRecipe: {
      type: RecipeType,
      args: {
        name: { type: GraphQLString },
        ingredients: { type: GraphQLList },
        pictures: { type: GraphQLList },
      },
    },
  },
});

module.exports = mutation;

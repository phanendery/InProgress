const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLList },
    pictures: {
      type: GraphQLList,
    },
  }),
});

module.exports = RecipeType;

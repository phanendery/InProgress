const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const User = mongoose.model("users");

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
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
    ingredients: { type: new GraphQLList(GraphQLString) },
    pictures: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

module.exports = RecipeType;

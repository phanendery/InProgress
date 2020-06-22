const mongoose = require("mongoose");
// const { GraphQLBoolean } = require("graphql");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }
});

module.exports = mongoose.model("likes", LikeSchema);

LikeSchema.statics.newLike = (recipeId,userId) =>{
  const User = mongoose.model("users");
  const Recipe = mongoose.model("recipes");
  
  return User.findById(userId).then((user) =>{
    if(user){
      
    }
  })
}
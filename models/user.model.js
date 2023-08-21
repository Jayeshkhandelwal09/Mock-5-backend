const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  user:String,
  userID:String
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

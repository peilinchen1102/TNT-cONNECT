const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  description: String,
  profession: String,
  education: String,
  photo: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);

const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  creator_profession: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://manojbhandaredev:manoj123@cluster0.fti4pl4.mongodb.net/simple-blog-app"
);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  published: Boolean,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("user", UserSchema);
const Post = mongoose.model("post", PostSchema);

module.exports = {
  User,
  Post,
};

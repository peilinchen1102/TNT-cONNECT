/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Story = require("./models/story");
const Comment = require("./models/comment");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login, (req, res) => res.send(req.user));
router.post("/logout", auth.logout);
router.get("/whoami", auth.login, (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// update profile -> it's suppose to be put but i get too lazy
router.post("/profile", auth.login, async (req, res) => {
  //console.log(req.user);

  const user = req.user;

  const { description, education, profession, photo } = req.body;

  user.description = description;
  user.education = education;
  user.profession = profession;
  user.photo = photo;

  await user.save();

  return res.json(user);
});

// router.get("/profile", auth.login, (req, res) => {
//   if (!req.query.userId) {
//     return res.json({ user: null });
//   }

//   User.findById(req.query.userId).then((user) => {
//     res.send(user);
//   });
// });

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({}).then((stories) => res.send(stories));
});

router.post("/story", auth.login, (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    creator_profession: req.user.profession,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/story/:storyId/comments", (req, res) => {
  const storyId = req.params.storyId;
  Comment.find({ parent: storyId }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.login, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    creator_profession: req.user.profession,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.get("/chat", (req, res) => {
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    // get any message sent by anybody to ALL_CHAT
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    // get messages that are from me->you OR you->me
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.login, (req, res) => {
  //console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();

  if (req.body.recipient._id == "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else {
    socketManager.getSocketFromUserID(req.user._id).emit("message", message);
    if (req.user._id !== req.body.recipient._id) {
      socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    }
  }
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

router.get("/user", (req, res) => {
  if (!req.query.userId) {
    return res.json({ user: null });
  }

  User.findById(req.query.userId)
    .then((user) => {
      //console.log("got user");
      //console.log(user);

      return res.json({ user });
    })
    .catch(() => {
      res.status(500).json({ message: "Some shit went wrong" });
    });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

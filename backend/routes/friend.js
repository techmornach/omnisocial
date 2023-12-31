const friends = require("express").Router();
const friendsController = require("../controllers/friend");
const { verifyToken } = require("../middleware/auth");


friends.delete("/:username/delete",verifyToken, friendsController.removeFriendFromUser);
friends.post("/:username/add",verifyToken, friendsController.acceptFriendRequest);
friends.delete("/:username/reject",verifyToken, friendsController.removeFriendRequest);
friends.post("/:username/request",verifyToken, friendsController.sendFriendRequest);
friends.get("/:username/", friendsController.getFriendsOfUser);
friends.get("/friend/private",verifyToken, friendsController.getFriendsOfUserPrivate);
friends.get("/nonfriend/private",verifyToken, friendsController.getAllNonFriendUsers);


module.exports = friends;
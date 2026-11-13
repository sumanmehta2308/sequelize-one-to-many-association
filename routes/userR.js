const express = require("express");
const router = express.Router();
const {createUser,createPost,getUserPosts} = require("../controllers/userC");
router.post("/", createUser);
router.post("/:userId/posts", createPost);
router.get("/:userId/posts", getUserPosts);
module.exports = router;

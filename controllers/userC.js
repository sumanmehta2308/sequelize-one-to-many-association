const { User, Post } = require("../models");
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
      name,
      email,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const post = await user.createPost({
      title,
      content,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Post,
          as: "posts",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User and posts retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// importing User model to use in routes here
const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No application was found with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.status(201).json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate({
        _id: req.params,
      });
      res.json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      // await User.updateMany(
      //   { _id: { $in: user.friends } },
      //   { $pull: { friends: user._id } }
      // );

      res.json({
        message: "User and their associated thoughts and friends deleted!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

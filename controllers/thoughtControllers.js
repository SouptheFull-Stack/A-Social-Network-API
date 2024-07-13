const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // GET ALL THOUGHTS
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ONE THOUGHT VIA ID AND ERROR HANDLE FOR INCORRECT ID
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // CREATE THOUGHT
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // assign the created thought to a user
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId }, // attach via user ID
        { $addToSet: { thoughts: thought._id } }, // adds to the array list for thoughts on user model
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created, but no user found with that ID" });
      }

      res.status(201).json("Successfully created your thought 🎉");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE THOUGHT
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.status(200).json("Successfully updated your thought 🎉");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE A THOUGHT VIA ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with that ID" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }, // pull the thought out of the array
        { new: true } // sets new so updated data is executed (deleted in this case)
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought found but no user with this ID!" });
      }

      res.json({
        message: "Thought successfully deleted and removed from user!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // CREATE A REACTION VIA THOUGHT ID WITH ERROR HANDLE
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // adding to reaction array on thought model
        { new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.status(201).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE REACTION AND REMOVE FROM THE THOUGHT ARRAY
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // pull reaction from array data of thought
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this Id" });
      }

      res.status(200).json({ message: `Reaction deleted successfully.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

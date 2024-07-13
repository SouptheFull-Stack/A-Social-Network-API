const router = require("express").Router();

// importing route functinos and destructuring into individual functions
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtControllers");

// functions for (/api/thoughts) path
router.route("/").get(getThoughts).post(createThought);

// functions for (/api/:thoughtId) where only a specific one is targeted
router
  .route("/thoughts/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/thoughts/:thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

// exporting for use elsewhere
module.exports = router;

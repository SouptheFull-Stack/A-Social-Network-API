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

// functions for (/api/thoughts/:thoughtId) where only a specific one is targeted
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

// functions for creation of reactions
router.route("/:thoughtId/reactions").post(createReaction);

// functions for deleting reaction via id with associated thought array
router.route("/thoughtId/reactions/reactionId").delete(removeReaction);

// exporting for use elsewhere
module.exports = router;

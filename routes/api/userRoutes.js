const router = require("express").Router();

// importing destructured functions routes
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userControllers");

// functions for (/api/users) path
router.route("/").get(getUsers).post(createUser);

// functions for (/api/:userId) where only a specific one is targeted
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

// exporting for use elsewhere
module.exports = router;

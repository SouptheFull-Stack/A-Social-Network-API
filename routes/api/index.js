const router = require("express").Router();

// export the full files of the model routes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// setup url paths with the model routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;

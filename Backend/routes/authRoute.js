const express = require("express");
const {
  login,
  register,
  getAllUsers,
  getUserByID,
} = require("../controllers/authControllers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/getUserByID/:id", getUserByID);
router.post("/login", login);
router.post("/register", register);

const AuthRoute = router;
module.exports = AuthRoute;

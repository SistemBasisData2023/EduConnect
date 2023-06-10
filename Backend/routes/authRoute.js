const express = require("express");
const {
  login,
  register,
  getAllUsers,
  getUserByID,
  logout,
  verifyToken,
} = require("../controllers/authControllers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/getUserByID/:id", getUserByID);
router.get("/token", verifyToken);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

const AuthRoute = router;
module.exports = AuthRoute;

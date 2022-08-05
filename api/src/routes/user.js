const express = require("express");
const {
  createUser,
  signIn,
  logOut

} = require("../controllers/user.js");

const { isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();


//user
userRouter.delete("/auth/logOut", isLoggedIn, logOut);

//guests

userRouter.post("/signUp", createUser);
userRouter.post("/signIn", signIn);


module.exports = userRouter;

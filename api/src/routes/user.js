const express = require("express");
const {
  createUser,
  updateUser,
  getSingleUser,
  signIn,
  logOut

} = require("../controllers/user.js");
const {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
} = require("../controllers/admin");
const { isAdmin, isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get("/admin/users", isLoggedIn, isAdmin, adminGetUsers);
userRouter.get("/admin/users/:id", isLoggedIn, isAdmin, adminGetUser);
userRouter.put("/admin/users/:id", isLoggedIn, isAdmin, adminUpdateUser);
userRouter.post("/admin/users", isLoggedIn, isAdmin, adminCreateUser);

//user
userRouter.get("/auth/users", isLoggedIn, getSingleUser);
userRouter.put("/auth/users", isLoggedIn, updateUser);
userRouter.delete("/auth/logOut", isLoggedIn, logOut);

//guests

userRouter.post("/signUp", createUser);
userRouter.post("/signIn", signIn);


module.exports = userRouter;

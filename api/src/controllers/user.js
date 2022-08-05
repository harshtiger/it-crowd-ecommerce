const  {User}   = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
require("dotenv").config();






const createUser = async (req, res) => {
  try {
    let { name, surname, email, password} = req.body;
    if (!name || !surname || !email ||  !password) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email
          
        },
      });
      if (isUserCreated) {
        res.status(400).send({ errorMsg: "Email already exists." });
      } else {
        password = await bcrypt.hash(password, 8);

        const isActive = true;
        const newUser = await User.create({
          name,
          surname,
          email,
          password,
          isActive,
        });
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
        console.log(token)
        
        res.status(201).send({
          successMsg: "User activation email sent.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};






const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
       
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "Email or password is wrong." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ errorMsg: "Invalid password." });
    }
    if (!user.isActive) {
      return res.status(400).send({ errorMsg: "User is not active." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await User.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res.header("auth-token", token).send({
      successMsg: "You signed in successfully.",
      data: { name: user.name, role: user.role, tokens: user.tokens },
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    let id = req.userID;
    let token = req.token;
    let loggedOutUser = await User.findOne({ where: { id } });
    let tokens = loggedOutUser.tokens;
    tokens = tokens.filter((tok) => tok !== token);
    await User.update(
      {
        tokens,
      },
      {
        where: {
          id: loggedOutUser.id,
        },
      }
    );
    res.status(200).send({ successMsg: "User has been logged out" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};



module.exports = {
  createUser,
  signIn,
  logOut
 
};

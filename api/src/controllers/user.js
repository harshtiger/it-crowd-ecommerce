const  User    = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
require("dotenv").config();


const createUser = async (req, res) => {
  try {
    let { name, surname, email, password } = req.body;
    if (!name || !surname || !email  || !password) {
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

        const isActive = false;
          await User.create({
          name,
          surname,
          email,
          password,          
          isActive,
        });   
      
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};



const updateUser = async (req, res) => {
  const id = req.userID;
  if (!id) {
    return res.status(400).send({ errorMsg: "Id was not provided." });
  }
  let user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).send({ errorMsg: "User not found." });
  }
   let {
    name,
    surname,
    email  
  } = req.body;
  try {
    if (
      !name ||
      !surname ||
      !email      
    ) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    if (email !== user.email) {
      let doesEmailExist = await User.findOne({
        where: {
          email        
        },
      });
      if (doesEmailExist) {
        return res.status(400).send({ errorMsg: "Email is already in use." });
      }
    }
    let updatedUser = await user.update({
      name,
      surname,
      email,
    });
    res.status(200).send({
      successMsg: "User successfully updated.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    let id = req.userID;
    if (!id) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let user = await User.findOne({
        where: { id }    
        });
      if (user) {
        user = {
          name: user.name,
          surname: user.surname,
          email: user.email          
        };
        return res
          .status(200)
          .send({ successfulMsg: "Here is your user data.", data: user });
      }
      res.status(404).send({ errorMsg: "User was not found." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
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
      data: { name: user.name, role: user.role },
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
  updateUser,
  getSingleUser,
  signIn,
  logOut 
};

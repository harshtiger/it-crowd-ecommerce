const  User  = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//this controllers are only meant to be used by admins

const adminGetUsers = async (req, res) => {
  try {
    let users = await User.findAll({
       });
    if (!users.length) {
      res.status(400).send({ errorMsg: "There are no users." });
    } else {
      users = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          password: user.password,
          email: user.email,
          role: user.role,
          isActive: user.isActive,                    
        };
      });
      res.status(200).send({ successMsg: "Here are your users.", users });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminGetUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id was not provided." });
    }
    let user = await User.findOne({
      where: { id },      
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    user = {
      name: user.name,
      surname: user.surname,
      email: user.email,      
      role: user.role,
      isActive: user.isActive,      
    };
    res.status(200).send({ successMsg: "Here is your user.", data: user });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id not provided." });
    }
    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    let { role, isActive } = req.body;
    if (!role || isActive === undefined) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    await user.update({    
      role,
      isActive,
    });
    res
      .status(200)
      .send({ successMsg: "User successfully updated." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    let {
      name,
      surname,
      email,
      password,     
      role,
      isActive,      
    } = req.body;
    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      role === undefined ||
      isActive === undefined      
    ) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email          
        },
      });
      if (isUserCreated) {
        res.status(400).send({ errorMsg: "An user with that email already exists." });
      } else {
        password = await bcrypt.hash(password, 8);
        await User.create({
          name,
          surname,
          email,
          password,         
          role,
          isActive,
        });
        res.status(201).send({ successMsg: "User successfully created." });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

module.exports = {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
};

const { User } = require("../db");
const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const sequelize = require("sequelize");
require("dotenv").config();
const { generateToken } = require("../utils/tokenmag");

const createUser = async (req, res) => {
  let { name, surname, email, password } = req.body;
  try {
    if (!name || !surname || !email || !password) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const newUser = await User.create({
        name,
        surname,
        email,
        password: await bcrypt.hash(password, 10),
      });

      res.status(200).json(newUser);
    }
  } catch (err) {
    console.error(err);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ errorMsg: "Invalid password." });
    }

    const token = jsonwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await user.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res.header("auth-token", token).send({
      successMsg: "You signed in successfully.",
      data: { name: user.name, role: user.role, token: user.tokens },
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
  logOut,
};

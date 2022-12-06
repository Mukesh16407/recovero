const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/userModel');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided.", success: false });
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          return res.status(401).json({ error: "you must be logged in" });
        }
        const { _id } = payload;
        User.findById(_id).then((userdata) => {
          req.user = userdata;
          next();
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Access denied. Invalid token.", success: false });
  }
};

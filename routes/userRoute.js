const express = require("express");
const router = express.Router();

const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

// register new user
router.post("/register", async (req, res) => {
    try {
  
      const userExists = await User.findOne({ email: req.body.email });
      if(userExists){
        return res.status(200).send({ message: "User already exists", success: false });
      }
     const password = req.body.password;
     const salt = await bcrypt.genSaltSync(10);
     const hashPassword = await bcrypt.hash(password,salt);
  
     req.body.password = hashPassword;
  
     const newUser = new User(req.body);
     await newUser.save();
  
     res.status(200).send({message:"user created successfully",success:true})
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error creating user", success: false, error });
    }
  });

// add-member
  router.post("/add-member",authMiddleware, async (req, res) => {
    try {
  
      const userExists = await User.findOne({ email: req.body.email });
      if(userExists){
        return res.status(200).send({ message: "User already exists", success: false });
      }
     const password = req.body.password;
     const salt = await bcrypt.genSaltSync(10);
     const hashPassword = await bcrypt.hash(password,salt);
  
     req.body.password = hashPassword;
  
     const newUser = new User(req.body);
     await newUser.save();
  
     res.status(200).send({message:"user created successfully",success:true})
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error creating user", success: false, error });
    }
  });

// all members
  router.get('/allusers',authMiddleware, async (req, res) =>{

    try {
      const members = await User.find(req?.body ? req.body : {});
      res.status(200).send({
        message: "members fetched successfully",
        success: true,
        data: members,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  });


  
  // login user
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if(!user){
        return res.status(200).send({ message: "User does not exist", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!isMatch) {
        return res.status(200).send({ message: "Password is incorrect", success: false });
      }else{
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
          expiresIn:"1d"
        });
        res.status(200).send({ message: "Login successful", success: true, token: token});
      }
    } catch (err) {
      console.log(err);
      res .status(500).send({ message: "Error logging in", success: false, err });
    }
  });

  router.post('/delete-member/:_id',authMiddleware, async(req,res)=>{

    try{
      const member = await User.findOneAndDelete({
        _id: req.params._id,
      });
      if (!member) {
        return res.send({
          message: "member not found",
          success: false,
        });
      }
      res.status(200).send({
        message: "member deleted successfully",
        success: true,
        data: member,
      });
  
    }catch(error){
      res.status(500).send({
        message: error.message,
        success: false,
      });
  
    }
  });

  (module.exports = router);
  
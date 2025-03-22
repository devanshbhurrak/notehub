const express = require("express");
const dotenv = require("dotenv");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");
const jwt = require('jsonwebtoken');

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;

        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            res.status(401).send("User Already Exists with this email");
        }

        if (!req.file) {
            return res.status(400).json({ error: "No Profile Image Provided" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'notehub/profile-images',
            transformation: [{ width: 200, height: 200, crop: 'fill' }]
          });

        const password = req.body.userPassword;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        await newUser.save();

        return res.status(200).json({
            status: "Ok",
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
      const user = await User.findOne({ userEmail: req.body.userEmail });
      if (!user) throw new Error('User not found');
  
      const passwordMatch = await bcrypt.compare(req.body.userPassword, user.userPassword);
      if (!passwordMatch) throw new Error('Invalid credentials');
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        status: "Success",
        token,
        user: {
          _id: user._id,
          userName: user.userName,
          profileImage: user.profileImage
        }
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login,  getCurrentUser };
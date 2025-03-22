const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const User = require('../Models/User')
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;

dotenv.config();

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const generateSecureUrl = (publicId) => {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true,
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
    });
  };

  const uploadNote = async (req, res) => {
    try {
      if (!req.file || !req.body.title || !req.body.userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "notehub/files"
      });
  
      const newNote = new Notes({
        fileName: req.body.title,
        fileDescription: req.body.description,
        tags: req.body.tags.split(',').map(tag => tag.trim()),
        files: {
          url: result.secure_url,
          public_id: result.public_id
        },
        uploadedBy: req.body.userId
      });
  
      await newNote.save();
      res.status(201).json({ status: "Success", data: newNote });
  
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  };

const getNote = async (req, res) => {
    try {
        const { title, tags, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        const query = {};

        if (title) query.fileName = { $regex: title, $options: "i" };
        if (tags) query.tags = { $all: tags.split(',').map(tag => tag.trim()) };

        const notes = await Notes.find(query)
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Notes.countDocuments(query);

        res.json({
            data: notes,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const userId = req.user._id;

    const note = await Notes.findOne({ _id: id, uploadedBy: userId });
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (req.file) {
      await cloudinary.uploader.destroy(note.files.public_id);
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "notehub/files"
      });
      
      note.files = {
        url: result.secure_url,
        public_id: result.public_id
      };
    }

    if (title) note.fileName = title;
    if (description) note.fileDescription = description;
    if (tags) note.tags = tags.split(',').map(tag => tag.trim());

    await note.save();
    
    res.json({
      status: "success",
      data: note
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const note = await Notes.findOneAndDelete({ _id: id, uploadedBy: userId });
    if (!note) return res.status(404).json({ error: "Note not found" });

    await cloudinary.uploader.destroy(note.files.public_id);

    res.json({
      status: "success",
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getNoteByID = async (req, res) => {
    try {
      const data = await Notes.find({ uploadedBy: req.params.id })
        .populate('uploadedBy', 'userName email')
        .select('fileName fileDescription tags files uploadedBy');
  
      res.json({ 
        status: "Success",
        data: data.map(note => ({
          ...note._doc,
          files: {
            url: note.files.url,
            public_id: note.files.public_id
          }
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  };
  const getNotesByUserID = async (req, res) => {
    try {
      const data = await Notes.find({ uploadedBy: req.params.id })
        .populate('uploadedBy', 'userName email')
        .lean();
  
      res.json({
        status: "Success",
        data: data.map(note => ({
          ...note,
          files: {
            url: note.files.url,
            public_id: note.files.public_id
          }
        }))
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user notes" });
    }
  };

module.exports = { uploadNote, getNote, getNoteByID, updateNote, deleteNote, getNotesByUserID };
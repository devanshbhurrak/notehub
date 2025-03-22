const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileDescription: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    files: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

module.exports = mongoose.model("Notes", NoteSchema);
const mongoose = require("mongoose")

const NoteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket"
    },
    Text: {
        type: String,
        required: [true, "Please enter a Text "]
    },
    isStaff: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })


module.exports = mongoose.model("Note", NoteSchema)
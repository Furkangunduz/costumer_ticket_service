const asyncHandler = require("express-async-handler")

const UserModel = require("../models/userModels")
const TicketModel = require("../models/ticketModels")
const NoteModel = require("../models/noteModels")


//@desc     Get user tickets
//@route    GET /api/tickets/:id/note
//@acces    private
const getNotes = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized.")
    }

    const notes = await NoteModel.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

//@desc     Get user tickets
//@route    POST /api/tickets/:id/note
//@acces    private
const addNotes = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized.")
    }

    const note = await NoteModel.create({ text: req.body.text, isStaff: false, ticket: req.params.ticketId, user: req.user.id })

    res.status(200).json(note)
})



module.exports = {
    getNotes,
    addNotes

}
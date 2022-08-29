const asyncHandler = require("express-async-handler")

const UserModel = require("../models/userModels")
const TicketModel = require("../models/ticketModels")


//@desc     Get user tickets
//@route    /api/tickets/
//@acces    private
const getTickets = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const tickets = await TicketModel.find({ user: req.user.id })

    res.status(200).json(tickets)
})

const createTickets = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("Please add product and description")
    }

    const user = await UserModel.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.create({
        product,
        description,
        user: req.user.id,
        status: "new",
    })

    res.status(201).json(ticket)
})

//@desc     Get user single ticket
//@route    /api/tickets/:id
//@acces    private
const getTicket = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }


    res.status(200).json(ticket)
})

//@desc     Delete user single ticket
//@route    /api/tickets/:id
//@acces    private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }

    ticket.remove()


    res.status(200).json({ succes: true })
})


//@desc     Update user single ticket
//@route    /api/tickets/:id
//@acces    private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await TicketModel.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }

    const updatedTicket = await TicketModel.findByIdAndUpdate(req.params.id, req.body, { new: true })


    res.status(200).json(updatedTicket)
})


module.exports = {
    getTickets,
    createTickets,
    getTicket,
    deleteTicket,
    updateTicket
}
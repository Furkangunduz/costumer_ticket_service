const express = require("express")
const router = express.Router({ mergeParams: true })
const protect = require("../middleware/authMiddleware")

const { getTickets, createTickets, getTicket, deleteTicket, updateTicket } = require("../controllers/ticketController")

const noteRouter = require("./noteRoutes")
router.use("/:ticketId/notes", noteRouter)


router.route("/")
    .get(protect, getTickets)
    .post(protect, createTickets)

router.route("/:id")
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router

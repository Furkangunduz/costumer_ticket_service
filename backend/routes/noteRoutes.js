const express = require("express")
const router = express.Router({ mergeParams: true })
const protect = require("../middleware/authMiddleware")

const { getNotes, addNotes } = require("../controllers/noteController")

router.route("/")
    .get(protect, getNotes)
    .post(protect, addNotes)


module.exports = router
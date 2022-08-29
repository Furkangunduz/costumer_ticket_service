const express = require("express")
require("dotenv").config()
const PORT = process.env.PORT || 5000
const errorHandler = require("./middleware/ErrorMiddleware")
const connectDB = require("./config/db")
var cors = require('cors')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server runnin on port: ${PORT}`)
})

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

app.use(errorHandler)
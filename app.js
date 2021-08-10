const express = require("express")
const cors = require("cors")

const rideRoutes = require("./routes/ride")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/ride", rideRoutes)

module.exports = app
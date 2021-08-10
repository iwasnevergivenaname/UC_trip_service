const express = require("express")
const rideRoutes = require("./routes/ride")

const app = express()

app.use(express.json())
app.use("/ride", rideRoutes)

module.exports = app
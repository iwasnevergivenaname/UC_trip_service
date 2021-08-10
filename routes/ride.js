const express = require("express")
const router = new express.Router()

router.post("/", (req, res) => {
  // RECEIVES PROPOSED ROUTE AND REQ ID
  const ride = req.body
  console.log("post ride", ride)

  // APPEND RIDE TO QUEUE

  // WHEN NEXT DRIVER IS AVAILABLE, ASSIGN RIDE

  // PUBLISH UPDATES (DRIVER LOCATION, RIDE LOCATION)

  // KEEP CACHE OF LAST UPDATED LOCATION
  return res.json({ride, code: 200})
})

router.get("/", (req, res) => {
  return res.send("hello")
})

module.exports = router
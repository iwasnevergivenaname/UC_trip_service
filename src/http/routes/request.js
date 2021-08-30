const express = require("express")
const {v4: uuid} = require("uuid")

const services = require("../../services").services


module.exports = function (app) {
  const router = new express.Router()
  router.use(express.json())

// health check
  router.get("/", (req, res) => {
    return res.sendStatus(200)
  })

  router.post("/:id", async (req, res) => {
    const {userId, pickup, dropoff} = req.body
    const tripId = req.params.id

    const ws = app.ws

    const cache = await app.db.redis.get(userId)
    await app.db.redis.set(userId, {...cache, status: "Pending"})
    res.sendStatus(200)
    app.services.DriverCheckout.CheckoutDriver(async (driver, checkin) => {
      const cache = await app.db.redis.get(userId)
      await app.db.redis.set(userId, {...cache, status: "OnGoing"})

      // I have a driver inside of here.
      const pretendDriver = new app.services.PretendDriver(tripId, driver, {
        async send(...args) {
          if (ws.tripClientCache[tripId]) {
            ws.tripClientCache[tripId].send.apply(ws.tripClientCache[tripId], args)
          }
        },
        on(event, cb) {
          if (ws.tripClientCache[tripId]) {
            ws.tripClientCache[tripId].on.apply(ws.tripClientCache[tripId], [event, cb])
          }
          cb()
        }
      }, {pickup, dropoff})

      await pretendDriver.script()
      checkin()
    })
  })

  return router
}
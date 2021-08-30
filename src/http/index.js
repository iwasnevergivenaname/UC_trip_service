const express = require("express")
const expWs = require("express-ws")
const router = require("./routes/request")


module.exports = function (app) {
  const server = express()
  expWs(server)

  server.use("/trip", router(app))
  server.ws.tripClientCache = {}
  server.ws("/events", async (client, _req) => {
    const setTimeoutMeta = setTimeout(() => {
      if (!client.id) {
        client.close("no request id assigned")
      }
    }, 5000)
    client.on("message", (data) => {
      console.log("DATA: ", data)
      const {id} = JSON.parse(data)
      client.id = id
      server.ws.tripClientCache[client.id] = client
      client.send("1")
      clearTimeout(setTimeoutMeta)
    })
  })

  return {
    server,
    async listen(port) {
      return new Promise((resolve) => {
        server.listen(port, () => {
          console.log(`${process.env.APP_NAME} running on ${port}`)
          resolve()
        })
      })
    },
    async stop() {
    }

  }
}
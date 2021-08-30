const {EventEmitter} = require("events")
const {Redis} = require("./database")
const Http = require("./http")
const Services = require("./services")

module.exports = class App extends EventEmitter {
  constructor() {
    super()
    this.db = {
      redis: Redis(this)
    }
    this.ws = null
    this.http = null

    this.services = Services(this)
  }

  async start(port) {
    // start up the con to the db first
    await this.db.redis.connect()

    // next we are ready to take in connections
    this.http = Http(this)
    // ws is attached onto our express up so we don't really need to call another function to set it up
    this.ws = this.http.server.ws
    await this.http.listen(port)
  }

  async stop() {
    // first we stop getting connections
    // this.gql.

    //then we shut down db connection
  }
}


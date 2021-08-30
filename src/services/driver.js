module.exports = function (app) {

  const slop = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1)
  const GenLocationCords = function* (start, end, numberOdPoints) {
    const m = slop(start.x, start.y, end.x, end.y)
    const above = start.y < end.y
    const rightOf = start.x < end.x

    const stepSize = 1
    for (let i = 0; i < numberOdPoints; i++) {
      yield({
        x: start.x + i + stepSize,
        y: start.y + i + stepSize
      })
    }
  }

  return class PretendDriver {
    constructor(requestId, driver, client, trip) {
      this.requestId = requestId
      this.driver = driver
      this.client = client
      this.trip = trip
    }

    get id() {
      return this.driver.id
    }

    send(data) {
      this.client.send(JSON.stringify(data))
    }

    _awaitThenMessage(data, resolve, timeout = 700) {
      setTimeout(async () => {
        await app.db.redis.set(`${this.requestId}:update`, JSON.stringify(data))
        this.send(data)
        resolve()
      }, timeout)
    }


    driverIsOnTheWay() {
      return new Promise(resolve => {
        const message = "driver is on the way"
        this._awaitThenMessage({
          message,
          location: {lat: -100, lng: 32}
        }, resolve)
      })
    }

    driverIsOnTheArriving() {
      return new Promise(resolve => {
        const message = "Driver is nearby please come outside"
        this._awaitThenMessage({
          message,
          location: {lat: -100, lng: 32}
        }, resolve)
      })
    }

    driverIsOutside() {
      return new Promise(resolve => {
        const message = "Driver is outside"
        this._awaitThenMessage({
          message,
          location: {lat: -100, lng: 32}
        }, resolve)
      })
    }

    driverDropoff() {
      return new Promise(resolve => {
        const message = "Ride is over please read you driver"
        this._awaitThenMessage({
          message,
          location: {lat: -100, lng: 32}
        }, resolve)
      })
    }

    async rideExperience() {
      const start = this.trip.pickup
      const end = this.trip.dropoff
      const gen = GenLocationCords({x: start.lat, y: start.lng}, {x: end.lat, y: end.lng}, 5)
      while (true) {
        const out = gen.next()
        if (out.done) {
          return
        }

        await new Promise(resolve => {
          this._awaitThenMessage({
            message: "",
            location: {lat: out.value.x, lng: out.value.y}
          }, resolve, 350)
        })
      }
    }

    async script() {
      await this.driverIsOnTheWay()
      await this.driverIsOnTheArriving()
      await this.driverIsOutside()
      return new Promise(resolve => {
        console.log("WE ARE INNNNNN")
        this.client.on(`${this.requestId}:userConfirmPickup`, async () => {
          await this.rideExperience()
          await this.driverDropoff()
          resolve()
        })
      })
    }
  }
}
/** todo {key: value} when you store in redis JSON.stringify({key: value}) and when you get the item back you just JSON.parse()
 */


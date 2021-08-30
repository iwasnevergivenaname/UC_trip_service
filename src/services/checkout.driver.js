const {Queue} = require("../queue")


module.exports = function (app) {
  class DriverCheckout {
    static Init() {
      this.requests = new Queue()
      this.drivers = new Queue()
      this.drivers.appendRight({id: 1})
      this.drivers.appendRight({id: 2})
      this.drivers.appendRight({id: 3})
    }

    static async _OnCheckin() {
      if (this.requests.length) {
        const req = this.requests.popLeft()
        this.CheckoutDriver(req)
      }
    }

    static async CheckoutDriver(cb) {
      if (this.drivers.length > 0) {
        const driver = this.drivers.popLeft()
        cb(driver, () => {
          this.drivers.appendRight(driver)
          this._OnCheckin()
        })
        return
      }
      else {
        this.requests.appendRight(cb)
      }
    }
  }

  DriverCheckout.Init()
  return DriverCheckout
}
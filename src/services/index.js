const makeDriver = require("./driver")
const makeRecordsService = require("./records")
const makeDriverCheckout = require("./checkout.driver")

module.exports.services = {}

module.exports = function (app) {
  module.exports.services = {};

  [makeDriver,
    makeRecordsService,
    makeDriverCheckout]
  .forEach(makeService => {
    const cls = makeService(app)
    module.exports.services[cls.name] = cls
  })

  return module.exports.services
}

module.exports = function (app) {
  class RecordsService {
    static StoreInS3() {
    }

    static StoreInPg() {
    }

    static GenerateEndOfRideService(ride) {
      this.StoreInPg()
      this.StoreInS3()
    }
  }

  app.on("riderEnded", (ride) => {
    RecordsService.GenerateEndOfRideService(ride)
  })

  return RecordsService
}
class Node {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}


// implement length
// implement tail
class Queue {
  constructor() {
    this.head = null
    this.length = 0
    this.tail = null
  }

  popLeft() {
    if (!this.head) {
      return "nothing in queue"
    }
    let n = this.head
    if (!this.head.next) {
      this.head = null
    }
    else {
      this.head = this.head.next
    }

    this.length--
    return n.value
  }

  appendRight(val) {
    if (!this.head) {
      this.length++
      this.head = new Node(val)
      this.tail = this.head
      return
    }
    let cur = this.head
    while (cur.next) {
      cur = cur.next
    }
    cur.next = new Node(val)
    this.tail = cur.next
    this.length++
  }

  removeGiven(id) {
    if (!this.head) {
      return "nothing in queue"
    }

    if (this.head.value === id) {
      return this.popLeft()
    }

    let cur = this.head.next
    let prev = this.head
    while (cur) {
      if (cur.value === id) {
        prev.next = cur.next
        break
      }
      prev = cur
      cur = cur.next
    }
  }


}

// class CheckoutDriver {
//   constructor() {
//     this.requests = new Queue()
//     this.drivers = new Queue()
//     this.drivers.appendRight({id: 1})
//     this.drivers.appendRight({id: 2})
//     this.drivers.appendRight({id: 3})
//   }
//
//   _onCheckin() {
//     if (this.requests.length) {
//       const req = this.requests.popLeft()
//       this.checkoutDriver(req)
//     }
//   }
//
//   checkoutDriver(cb) {
//     if (this.drivers.length > 0) {
//       const driver = this.drivers.popLeft()
//       cb(driver, () => {
//         this.drivers.appendRight(driver)
//         this._onCheckin()
//       })
//       return
//     }
//     else {
//       this.requests.appendRight(cb)
//     }
//   }
// }

// const c = new CheckoutDriver()
//
// const requestRide = (id) => {
//   c.checkoutDriver((driver, checkin) => {
//     console.log("checked out driver", driver.id)
//     setTimeout(() => {
//       ws.emit(id, "a rider has been assign to you ")
//       writeToRedis(id, ",message")
//       setTimeout(() => {
//         ws.emit(id, "a rider is on the way")
//         writeToRedis(id, ",message")
//
//         setTimeout(() => {
//           ws.emit(id, "driver is arriviing")
//           writeToRedis(id, ",message")
//
//           setTimeout(() => {
//             ws.emit(id, "driver has arrived")
//             writeToRedis(id, ",message")
//
//             ws.on('userInCar', () => {
//               ws.emit(id, "rider start")
//               writeToRedis(id, ",message")
//               setTimeout(() => {
//                 ws.emit(id, "arrivinbg")
//                 writeToRedis(id, ",message")
//                 ws.on('uderDropoff', () => {
//                   ws.emit(id, "rider over")
//                   writeToRedis(id, ",message")
//
//                   checkin()
//                 })
//               })
//             })
//           })
//         })
//       }, 5 * 1000)
//
//
//       // checkin()
//     }, 40000)
//   })
// }
//
// const rideRouter = {}
// rideRouter.post("/request", (req, res) => {
//   const request = req.body
//   const riderId = uuid.v4()
//   requestRide(riderId)
//   res.send({rideId})
// })

// (() => {
//
//   const ws = new WebSocet()
//
//   const c = new CheckoutDriver()
//   c.checkoutDriver((driver, checkin) => {
//     console.log("checked out driver", driver.id)
//     setTimeout(() => {
//       checkin()
//     }, 40000)
//   })
//
//   c.checkoutDriver((driver, checkin) => {
//     console.log("checked out driver", driver.id)
//     setTimeout(() => {
//       checkin()
//     }, 2000)
//   })
//
//   c.checkoutDriver((driver, checkin) => {
//     console.log("checked out driver", driver.id)
//     setTimeout(() => {
//
//       checkin()
//     }, 2000)
//   })
//
//   c.checkoutDriver((driver, checkin) => {
//
//     const newConfirmationId = "123" + driver.id
//     ws.emit("Driver Assigned")
//
//     console.log("checked out driver", driver.id)
//     setTimeout(() => {
//       checkin()
//     }, 2000)
//   })
// })()


module.exports = {Queue}
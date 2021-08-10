class Node {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}


class Queue {
  constructor() {
    this.head = null
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
    return n.value
  }

  appendRight(val) {
    if (!this.head) {
      this.head = new Node(val)
      return
    }
    let cur = this.head
    while (cur.next) {
      cur = cur.next
    }
    cur.next = new Node(val)
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


module.exports = Queue
const IORedis = require("ioredis")

// const url = "localhost"

class Redis {
  constructor() {
    this.connection = new IORedis()
  }

  getConnection() {
    const conn = this.connection
    return {
      get(...args) {
        return conn.get(...args)
      },
      set(...args) {
        return conn.set(...args)
      }
    }
  }

  async connect() {
  }

  async close() {
  }

  async get(key) {
    const res = await this.connection.get(key)
    try {
      return JSON.parse(res)
    }
    catch {
      return res
    }
  }

  async set(key, value) {
    return await this.connection.set(key, JSON.stringify(value))
  }
}


module.exports = function (app) {
  return new Redis()
}


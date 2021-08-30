const path = require("path")
require("dotenv").config({path: path.join(__dirname, "../", ".env")})

const App = require('./app')
const app = new App()
app.start(process.env.PORT).catch(console.log)
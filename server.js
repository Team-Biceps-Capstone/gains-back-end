// What Adrian's login backend needs in his app.js file. 
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Set routers
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// 
app.use('/api/user', userRoutes)

// connect to db //Adrian's mongodb
mongoose.connect(process.env.CONNECTION_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT2, () => {
      console.log('connected to db & listening on port', process.env.PORT2)
    })
  })
  .catch((error) => {
    console.log(error)
  })
  
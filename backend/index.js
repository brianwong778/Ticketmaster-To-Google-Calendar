require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
const middleware = morgan('tiny')
app.use(middleware)
app.use(cors())
app.use(express.static('dist'))

const User = require('./models/users')
const ticketMaster = require('./services/ticketMaster')
const googleOAuthRoutes = require('./services/google');

const path = require('path')
require('dotenv').config({
    override: true,
    path: path.join(__dirname,'.env')
})

app.get('/api/users', (request, response) => {
    User.findAll().then(users => {
      response.json(users);
    })
})

app.use("/api/data",ticketMaster)

app.use("/",googleOAuthRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

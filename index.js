const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const cookieParser = require('cookie-parser')


mongoose.connect('mongodb://localhost:27017', {
     useNewURlParser: true,
      useUnifiedTopology: true, 
}, () => {
    
    console.log('connected to database')
}) 

const routes = require('./routes/routes')

app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin:['http://localhost:8080','http://localhost:8000']
}))
app.use(express.static('public'))
app.use('/api', routes)

// app.use(cookieParser())

 //to prevent frontend and backend dependecies of different port on browser throwing narrow - to take cookie which we sent




app.listen(port = 8000)
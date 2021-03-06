const express = require("express")
const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose")
const config = require('./config/databse')
const bodyParser = require("body-parser")
const authentiation = require('./routes/authentication')(router)
const blogs = require('./routes/blog')(router)
const cors = require("cors")
const port=process.env.PORT || 8080

mongoose.Promise = global.Promise
mongoose.connect(config.uri,{  useCreateIndex: true,useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
       // console.log(config.secret)
        console.log("connected: " + config.db)
    }
})

app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public/'))
app.use('/authentication', authentiation)
app.use('/blogs', blogs)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})
app.listen(port, (err) => {
    console.log("runing")
})
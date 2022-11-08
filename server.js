const express = require('express');
const app = express()
const port = process.env.port || 3000
const connectDB = require('./config/db')
const routes = require('./routes/files')
const routesShow = require('./routes/show')
const download = require('./routes/download')
const path = require('path')
const cors = require('cors')
connectDB();

// Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions))

app.use(express.static('public'))
app.use(express.json())

// Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Routes
app.use('/api/files/', routes)
app.use('/files', routesShow)
app.use('/files/download', download)

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})
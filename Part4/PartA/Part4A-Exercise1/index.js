/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
//const http = require('http')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Connected successfully')
})
app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    }).catch((error) => {
        console.log(error)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog({...request.body })

    blog.save().then((result) => {
        response.status(201).json(result)
    }).catch((error) => {
        response.status(400).json({ error: error })
    })
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT | 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
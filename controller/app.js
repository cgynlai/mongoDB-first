const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog')

const app = express();


const dbURI = 'mongodb+srv://regularUser:regularUser123@mongo1.fvf5m.mongodb.net/firstDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(3000))
.catch((err)=> console.log(err));

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 3',
        snippet: 'about my new blog',
        body: 'about my blog story'
    })

    blog.save()
    .then(result => res.send(result))
    .catch (err => console.log(err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6043931012fd6d0ff411212b')
    .then(result => res.send(result))
    .catch(err=>console.log(err))
})
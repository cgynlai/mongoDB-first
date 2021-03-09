const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('../models/blog')

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());


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

app.post('/add-use-post', (req,res) => {
    var newTitle = req.body.title;
    var newSnippet = req.body.snippet;
    var newBody = req.body.body;

    const blog = new Blog({
        title : newTitle,
        snippet : newSnippet,
        body : newBody
    })

    blog.save( function(err,result){
        if(err){
            console.log(err)
        }else {
            res.send(result);
        }
    })
})

app.put('/update', (req,res) => {
    Blog.findOneAndUpdate({title: 'new blog'}, {title: 'changed new blog'})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})
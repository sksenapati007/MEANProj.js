const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

mongoose.connect ('mongodb://localhost:27017/PostApp').then(()=>{
  console.log('Connected to DataBase')
}).catch(()=>{
  console.log('Connection Failed!')
});

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
  next();
})

app.post('/api/posts', (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  //mongoose will create an insert query &
  //saves the data along-with auto-ID and the data as per schema
  //Collection Name is plural of Model(i.e. Posts)
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts',(req,res,next)=>{
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id",(req,res,next) => {
  console.log("ID"+req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message : "Post Deleted!"});
  });
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

const app= express();
app.use(bodyParser.json());

const commentsByPostId={};

app.get('/posts/:id/comment', (req,res) =>{
    
    res.send(commentsByPostId[req.param.id]||[])
});

app.post('/posts/:id/comment',(req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const content = req.body.content;

    const comments=commentsByPostId[req.param.id] || [];
    comments.push({id:commentId, content});
    commentsByPostId[req.param.id]=comments;
    res.status(201).send(comments);
});

app.listen(4001,() => {
    console.log("Listening to port 4001")

});

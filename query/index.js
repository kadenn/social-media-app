const firebase = require('firebase/app');
require('firebase/database');
const config = require('./config');

firebase.initializeApp(config);
const database = firebase.database();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title, user } = data;
    let postRef = database.ref('posts');
    postRef.child(id).set({
      id: id,
      user: user,
      title: title,
      date: new Date().toLocaleString(),
    });
  }

  if (type === 'CommentApproved') {
    const { id, content, postId, status, user } = data;
    let commentRef = database.ref('posts/' + postId + '/comments');
    commentRef.child(id).set({
      id: id,
      user: user,
      content: content,
      status: status,
    });
  }
};

app.get('/posts', (req, res) => {
  let postRef = database.ref('posts');
  postRef.once(
    'value',
    (snapshot) => {
      let posts = snapshot.val();
      console.log('posts:', posts);
      res.send(posts);
    },
    (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
      res.send('The read failed');
    }
  );
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://event-bus:4005/events');
  let data = await res.data;

  for (let event of data) {
    console.log('Processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});

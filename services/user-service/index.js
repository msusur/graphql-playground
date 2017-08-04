const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const users = [];

app.use(bodyParser.json());

app.get('/users', function (req, res) {
  res.status(200).json(users);
});

app.get('/users/:id', function (req, res) {
  const id = req.params.id;
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      res.status(200).json(users[i]);
      return;
    }
  }
  res.status(404).end();
});

app.post('/users', function (req, res) {
  const user = req.body;

  if (user && user.name && user.email && user.password) {
    user.id = uuidv4();
    users.push(user);
    res.status(200).json(user);
  } else {
    res.status(400).end();
  }
});

var server = app.listen(8092, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const users = [
  { id: "6517f9c4-5f1b-4327-a9c4-b3df60c17785", name: "John", email: "john@doe.com", password: "123" },
  { id: "7e353f36-fba2-4f19-a16f-d95ad8864616", name: "Sarah", email: "sarah@doe.com", password: "1234" },
  { id: "5d895ede-c681-4419-bb18-8b7de73c6746", name: "Michael", email: "mike@doe.com", password: "1235" },
  { id: "3e38209e-2117-4fd3-8a57-dc8d2ed28f59", name: "Jessica", email: "jess@doe.com", password: "1236" },
  { id: "dff76a34-4854-45da-8b79-c1817f451f51", name: "Clark", email: "clark@doe.com", password: "1237" },
];

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
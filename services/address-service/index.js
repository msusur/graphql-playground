const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const address = [];

app.use(bodyParser.json());

app.get('/address', function (req, res) {
  res.status(200).json(address);
});

app.get('/address/:id', function (req, res) {
  const id = req.params.id;
  for (var i = 0; i < address.length; i++) {
    if (address[i].id === id) {
      res.status(200).json(address[i]);
      return;
    }
  }
  res.status(404).end();
});

app.post('/address', function (req, res) {
  const address = req.body;

  if (address && address.name && address.email && address.password) {
    address.id = uuidv4();
    address.push(address);
    res.status(200).json(address);
  } else {
    res.status(400).end();
  }
});

var server = app.listen(8080, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
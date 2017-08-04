const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const addressList = [];

app.use(bodyParser.json());

app.get('/address/:userid', function (req, res) {
  const id = req.params.userid;
  const userAddress = [];
  for (var i = 0; i < addressList.length; i++) {
    if (addressList[i].userid === id) {
      userAddress.push(addressList[i]);
    }
  }
  res.status(200).json(userAddress);
});

app.post('/address', function (req, res) {
  const address = req.body;

  if (address && address.userid && address.details) {
    address.id = uuidv4();
    addressList.push(address);
    res.status(200).json(address);
  } else {
    res.status(400).end();
  }
});

var server = app.listen(8090, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const addressList = [
  { id: "4074b61d-b187-464a-8469-e5ec513570d2", userid: "6517f9c4-5f1b-4327-a9c4-b3df60c17785", details: "N12", city: "London" },
  { id: "4074b61d-b187-464a-8469-e5ec51357003", userid: "6517f9c4-5f1b-4327-a9c4-b3df60c17785", details: "SE2", city: "London" },
  { id: "583c980e-6c23-4153-9e24-e4f0f84fd66c", userid: "7e353f36-fba2-4f19-a16f-d95ad8864616", details: "N2", city: "London" },
  { id: "fea04efe-c035-4200-ac86-28447b7c83dd", userid: "7e353f36-fba2-4f19-a16f-d95ad8864616", details: "N1", city: "London" },
  { id: "4074b61d-b187-464a-8469-e5ec513570d2", userid: "3e38209e-2117-4fd3-8a57-dc8d2ed28f59", details: "S1", city: "London" },
  { id: "b91cf4f6-d4fb-4773-9d9c-e068a5c8be1d", userid: "3e38209e-2117-4fd3-8a57-dc8d2ed28f59", details: "SE1", city: "London" },
  { id: "209c667a-711e-4073-96c0-b75725f1a7f1", userid: "3e38209e-2117-4fd3-8a57-dc8d2ed28f59", details: "NW1", city: "London" },
  { id: "55035186-0f5d-476a-b01b-f9573f617e34", userid: "dff76a34-4854-45da-8b79-c1817f451f51", details: "S1", city: "London" },
  { id: "9761e9f0-1123-48cc-aaaf-0a6c4f7e6be7", userid: "7e353f36-fba2-4f19-a16f-d95ad8864616", details: "W2", city: "London" },
  { id: "d4dc7924-3506-4a3f-898d-4db6280dcb19", userid: "5d895ede-c681-4419-bb18-8b7de73c6746", details: "NW2", city: "London" },
  { id: "63fb9b63-a4af-4f33-a576-14e476a65dfb", userid: "7e353f36-fba2-4f19-a16f-d95ad8864616", details: "N12", city: "London" },
  { id: "d4dc7924-3506-4a3f-898d-4db6280dcb19", userid: "5d895ede-c681-4419-bb18-8b7de73c6746", details: "N12", city: "London" },
];

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
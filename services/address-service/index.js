const express = require('express');
const app = express();


app.get('/address/:id', function (req, res) {
  res.send({
    name: 'test address'
  });
});

var server = app.listen(8080, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
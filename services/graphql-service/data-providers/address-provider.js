const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');
// const HOST_NAME = 'address-service';
const HOST_NAME = 'localhost';

class AddressProvider {
  getAddress(userid) {
    return fetch(`http://${HOST_NAME}:8090/address/${userid}`)
      .then(response => response.json())
      .then((data) => {
        return data;
      });
  }

  createAddress(userid, detail, city) {
    return fetchJson(`http://${HOST_NAME}:8090/address`, {
      method: 'POST',
      body: {
        userid,
        detail,
        city
      }
    });
  }
}

module.exports = new AddressProvider();
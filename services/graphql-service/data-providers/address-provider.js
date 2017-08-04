const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');
const HOST_NAME = 'address-service';
// const HOST_NAME = 'localhost';

class AddressProvider {
  getAddress(userid) {
    return fetch(`http://${HOST_NAME}:8090/address/${userid}`)
      .then(response => response.json())
      .then((data) => {
        return data;
      });
  }

  createAddress(userid, address) {
    return fetchJson(`http://${HOST_NAME}:8090/address`, {
      method: 'POST',
      body: {
        userid,
        details: address.details,
        city: address.city
      }
    });
  }
}

module.exports = new AddressProvider();
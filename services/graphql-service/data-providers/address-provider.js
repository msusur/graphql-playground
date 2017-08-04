const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');

class AddressProvider {
  getAddress(userid) {
    return fetch(`http://address-service:8090/address/${userid}`)
      .then(response => response.json())
      .then((data) => {
        return data;
      });
  }

  createAddress(userid, detail, city) {
    return fetchJson('http://address-service:8090/address', {
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
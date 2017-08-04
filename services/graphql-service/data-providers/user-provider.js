const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');

class UserProvider {
  getAllUsers() {
    return fetch('http://localhost:8092/users').then(body => body);
  }

  getUsers(id) {
    if (!id) {
      return this.getAllUsers();
    }
    return fetch(`http://localhost:8092/users/${id}`)
      .then(response => response.json())
      .then((data) => {
        return data;
      });
  }

  createUser(name, email, password) {
    return fetchJson('http://localhost:8092/users', {
      method: 'POST',
      body: {
        name,
        email,
        password
      }
    });
  }
}

module.exports = new UserProvider();
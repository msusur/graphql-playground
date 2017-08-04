const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');
const HOST_NAME = 'user-service';
// const HOST_NAME = 'localhost';

class UserProvider {
  getAllUsers() {
    return fetch(`http://${HOST_NAME}:8092/users`).then(body => body.json());
  }

  getUser(id) {
    if (!id) {
      return this.getAllUsers();
    }
    return fetch(`http://${HOST_NAME}:8092/users/${id}`)
      .then(response => response.json());
  }

  createUser(user) {
    return fetchJson(`http://${HOST_NAME}:8092/users`, {
      method: 'POST',
      body: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });
  }
}

module.exports = new UserProvider();
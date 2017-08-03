const fetch = require('node-fetch');

class UserProvider {
  getAllUsers() {
    return fetch('http://user-service:8080/users').then(body => body);
  }

  getUsers(obj, context) {
    const id = obj.id;
    if (!id) {
      return this.getAllUsers();
    }
    return fetch(`http://user-service:8080/users/${id}`)
      .then(response => response.json())
      .then((data) => {
        return [
          data
        ];
      });
  }
}

module.exports = new UserProvider();
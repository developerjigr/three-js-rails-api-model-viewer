let userResourceUrl = "localhost:3000/users"
let ringsResourceUrl = "http://localhost:3000/rings"

class Adapter {

  static getUsers() {
    return fetch(userResourceUrl)
    .then(resp => resp.json());
  }

  static getRings() {
    return fetch(ringsResourceUrl)
    .then(resp => resp.json());
  }

}

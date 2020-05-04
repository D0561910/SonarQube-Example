const db = require("../config/firebase.config");

var userItem = [{ id: 1, name: "test", password: "123456" }];

// if (userItem.length < 1 ) {
//   db.ref("/").once("value", async function (snapshot) {
//     var newPost = await snapshot.val();
//     for (let index in newPost) {
//       userItem.push({
//         id: newPost[index].id,
//         name: newPost[index].name,
//         password: newPost[index].password,
//       });
//     }
//   });
//   db.off()
// }

function findUser(name, password) {
  return userItem.find(function (item) {
    return item.name === name && item.password === password;
  });
}

module.exports = findUser;

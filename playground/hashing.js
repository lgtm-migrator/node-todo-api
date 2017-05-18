const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "abc123";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

var hashedPassword = "$2a$10$OTYElKuS9XH78N.QpeNfgOmMeWslkxrgn9OD5v8S2exp7OZ9sB0oO";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

bcrypt.compare("abcde", hashedPassword, (err, res) => {
  console.log(res);
})

// var data = {
//   id: 1
// };
//
// // Takes an object and hash it: jwt.sign(obj, secret)
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// // Make sure data is not manipulated: jwt.verify(token, [this must be the right secret])
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// EXPLANATION OF HASHING
// var message =  'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 1
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecretkeptawayfromuser").toString()
// };
//
// // If user change the data and try to hash, authentication should fail
// token.data.id = 5;
// var resultHash =SHA256(JSON.stringify(token.data)).toString();
//
// // var resultHash = SHA256(JSON.stringify(token.data) + "somesecretkeptawayfromuser").toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was manipulated. Authentication failed');
// }

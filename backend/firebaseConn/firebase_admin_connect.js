var admin = require('firebase-admin');
var serviceAccount = require('./project-a8988-firebase-adminsdk-4zyxs-6f5992d345.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-a8988.firebaseio.com',
});
var db = admin.database();
module.exports = db;

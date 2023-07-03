const admin = require("firebase-admin");
const serviceAccount = require("./PrivateKey/ServiceAccount.json");
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'audify-1094b.appspot.com'
});

const bucketname = 'audify-1094b.appspot.com';
const bucket = getStorage().bucket();
module.exports = {admin,bucket,bucketname};
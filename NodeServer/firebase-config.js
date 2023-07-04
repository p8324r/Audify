const admin = require("firebase-admin");
// Replace the text in the 'require' below, with the path of your File.
const serviceAccount = require("./PrivateKey/ServiceAccount.json");
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: '<YOUR_FIREBASE_STORAGE_BUCKET_LINK>'
});

const bucketname = '<YOUR_FIREBASE_STORAGE_BUCKET_LINK>';
const bucket = getStorage().bucket();
module.exports = {admin,bucket,bucketname};

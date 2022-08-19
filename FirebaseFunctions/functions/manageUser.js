const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

exports.deleteUser = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
  });

async function asyncGetUserSubs(uid) {
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((subs) => {
      if (subs.exists) return subs.data().subscriptions;
      else return [];
    });
}

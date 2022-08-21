const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

exports.onUserCreation = functions
  .region("europe-west1")
  .auth.user()
  .onCreate((user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set({ friends: [], subscriptions: [] }, { merge: true });
  });

exports.onSubInsert = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onCreate((snap, context) => {
    return snap
      .data()
      .owner.update({
        subscriptions: admin.firestore.FieldValue.arrayUnion(
          db.collection("subscriptions").doc(context.params.subId)
        ),
      })
      .catch((e) => console.log(e));
  });

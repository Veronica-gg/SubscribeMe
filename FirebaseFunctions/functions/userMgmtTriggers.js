const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

exports.onUserCreation = functions
  .region("europe-west1")
  .auth.user()
  .onCreate((user) => {
    return db.collection("users").doc(user.uid).set(
      {
        friends: [],
        pendingFriendsRecv: [],
        pendingFriendsSent: [],
        subscriptions: [],
      },
      { merge: true }
    );
  });

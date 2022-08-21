const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

// exports.deleteUser = functions
//   .region("europe-west1")
//   .https.onCall((data, context) => {
//     let uid = context.auth.uid;
//   });

// async function asyncGetUserSubs(uid) {
//   return await db
//     .collection("users")
//     .doc(uid)
//     .get()
//     .then((subs) => {
//       if (subs.exists) return subs.data().subscriptions;
//       else return [];
//     });
// }

exports.setName = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;
    return db
      .collection("users")
      .doc(uid)
      .set({ name: data.name }, { merge: true })
      .then(() => {
        return { message: "ok" };
      })
      .catch(() => {
        return { message: "error" };
      }); //TODO -- check name validity
  });

// the idea is that first we add a friend, and then the other must accept. Do we need other parameters?
exports.addFriendRequest = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let error = false;
    let uid = context.auth.uid;
    let uidDoc = db.collection("users").doc(uid);
    let friendRecord = await admin
      .auth()
      .getUserByEmail(data.email)
      .catch(() => {
        error = true;
      });
    if (error) return { message: "errorNotExists" };
    if (friendRecord.uid === uid) return { message: "errorNoOwnFriend" };
    let friendDoc = db.collection("users").doc(friendRecord.uid);
    let uidLoadedDoc = await uidDoc.get().catch(() => {
      error = true;
    });
    if (error) return { message: "errorInternal" };
    if (uidLoadedDoc.data().friends.find((el) => el.isEqual(friendDoc))) {
      return { message: "errorAlreadyFriend" };
    }
    return uidDoc
      .update({
        pendingFriends: admin.firestore.FieldValue.arrayUnion(friendDoc),
      })
      .then(() => {
        return friendDoc
          .update({
            pendingFriends: admin.firestore.FieldValue.arrayUnion(uidDoc),
          })
          .then(() => {
            return { message: "ok" };
          })
          .catch(() => {
            return { message: "errorUpdateFriend" };
          });
      })
      .catch(() => {
        return { message: "errorUpdateMe" };
      });
  });

exports.addFriend = functions // react only on friend request accepted
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let error = false;
    let uid = context.auth.uid;
    let uidDoc = db.collection("users").doc(uid);
    let friendRecord = await admin
      .auth()
      .getUserByEmail(data.email)
      .catch(() => {
        error = true;
      });
    if (error) return { message: "errorNotExists" };
    if (friendRecord.uid === uid) return { message: "errorNoOwnFriend" };
    let friendDoc = db.collection("users").doc(friendRecord.uid);
    let uidLoadedDoc = await uidDoc.get().catch(() => {
      error = true;
    });
    if (error) return { message: "errorInternal" };
    if (uidLoadedDoc.data().friends.find((el) => el.isEqual(friendDoc))) {
      return { message: "errorAlreadyFriend" };
    }
    return uidDoc
      .update({ friends: admin.firestore.FieldValue.arrayUnion(friendDoc) })
      .then(() => {
        return friendDoc
          .update({ friends: admin.firestore.FieldValue.arrayUnion(uidDoc) })
          .then(() => {
            return { message: "ok" };
          })
          .catch(() => {
            return { message: "errorUpdateFriend" };
          });
      })
      .catch(() => {
        return { message: "errorUpdateMe" };
      });
  });

exports.removeFriend = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let error = false;
    let uid = context.auth.uid;
    let uidDoc = db.collection("users").doc(uid);
    let friendDoc = db.collection("users").doc(data.friendUid);
    return uidDoc
      .update({ friends: admin.firestore.FieldValue.arrayRemove(friendDoc) })
      .then(() => {
        return friendDoc
          .update({ friends: admin.firestore.FieldValue.arrayRemove(uid) })
          .then(() => {
            return { message: "ok" };
          })
          .catch(() => {
            return { message: "errorUpdateFriend" };
          });
      })
      .catch(() => {
        return { message: "errorUpdateMe" };
      });
  });

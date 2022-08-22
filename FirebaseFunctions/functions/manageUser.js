const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

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
        pendingFriendsSent: admin.firestore.FieldValue.arrayUnion(friendDoc),
      })
      .then(() => {
        return friendDoc
          .update({
            pendingFriendsRecv: admin.firestore.FieldValue.arrayUnion(uidDoc),
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

exports.answerFriendRequest = functions // manage accepted or rejected friend request
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    const accepted = data.accepted;
    let error = false;
    let uid = context.auth.uid;
    let uidDoc = db.collection("users").doc(uid);
    let friendReqDoc = db.collection("users").doc(data.friendReqUid);
    let uidLoadedDoc = await uidDoc.get().catch(() => {
      error = true;
    });
    let friendReqLoadedDoc = await friendReqDoc.get().catch(() => {
      error = true;
    });
    if (error) return { message: "errorInternal" };
    if (
      !(
        uidLoadedDoc
          .data()
          .pendingFriendsRecv.find((el) => el.isEqual(friendReqDoc)) &&
        friendReqLoadedDoc
          .data()
          .pendingFriendsSent.find((el) => el.isEqual(uidDoc))
      )
    ) {
      return { message: "errorNoSuchReq" };
    }
    return uidDoc
      .update(
        accepted
          ? {
              friends: admin.firestore.FieldValue.arrayUnion(friendDoc),
              pendingFriendsRecv:
                admin.firestore.FieldValue.arrayRemove(friendDoc),
            }
          : {
              pendingFriendsRecv:
                admin.firestore.FieldValue.arrayRemove(friendDoc),
            }
      )
      .then(() => {
        return friendDoc
          .update(
            accepted
              ? {
                  friends: admin.firestore.FieldValue.arrayUnion(uidDoc),
                  pendingFriendsSent:
                    admin.firestore.FieldValue.arrayRemove(uidDoc),
                }
              : {
                  pendingFriendsSent:
                    admin.firestore.FieldValue.arrayRemove(uidDoc),
                }
          )
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

exports.getFriendsData = functions // function to get list of friends, requests sent or received
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    const subs = asyncGetFriends(uid, data.requestType);
    return subs.then((res) => {
      if (res === -1) return { message: "errorGetFriends", friends: [] };
      else {
        return this.getUsersInfo(res).then((queryResult) => {
          return queryResult;
        });
      }
    });
  });

async function asyncGetFriends(uid, friendType) {
  if (
    !(
      friendType === "friends" ||
      friendType === "pendingFriendsRecv" ||
      friendType === "pendingFriendsSent"
    )
  )
    return -1;
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((subs) => {
      if (subs.exists) {
        if (friendType === "friends") return subs.data().friends;
        else if (friendType === "pendingFriendsRecv")
          return subs.data().pendingFriendsRecv;
        else if (friendType === "pendingFriendsSent")
          return subs.data().pendingFriendsSent;
      } else {
        return -1;
      }
      return -1;
    });
}

exports.getUsersInfo = async function getUsersInfo(users) {
  if (!users) return { message: "errorUsersUndefined", users: [] };
  let infos = [];
  let error = false;
  for (const user of users) {
    let getError = false;
    const userInfo = await user.get().catch(() => {
      getError = true;
      error = true;
    });
    if (!getError && userInfo.exists) {
      infos.push({
        name: userInfo.data().name,
        email: userInfo.data().email,
        id: userInfo.id,
      });
    } else {
      error = true;
    }
  }
  return { message: error ? "errorFetchingUsers" : "ok", users: infos };
};

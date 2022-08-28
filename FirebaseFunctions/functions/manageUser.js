const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();
const maxLength = 10;

exports.setName = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;
    let name = data.name;
    if (name.length === 0 || name.length > maxLength || !name.match(/^\w+$/))
      name = "User";
    return admin
      .auth()
      .updateUser(uid, { displayName: name })
      .then((v) => {
        return { message: "ok", user: { name: v.displayName, email: v.email } };
      })
      .catch(() => {
        return { message: "error", user: { name: "User", email: "" } };
      });
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
    if (
      !uidLoadedDoc.data().friends ||
      uidLoadedDoc.data().friends.find((el) => el.isEqual(friendDoc))
    ) {
      return { message: "errorAlreadyFriend" };
    }
    if (
      !uidLoadedDoc.data().pendingFriendsRecv ||
      uidLoadedDoc.data().pendingFriendsRecv.find((el) => el.isEqual(friendDoc))
    ) {
      return answerFriendRequestAsync(
        {
          accepted: true,
          friendReqUid: friendRecord.uid,
        },
        context
      );
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

async function answerFriendRequestAsync(data, context) {
  const accepted = data.accepted;
  let uid = context.auth.uid;
  let uidDoc = db.collection("users").doc(uid);
  let friendReqDoc = db.collection("users").doc(data.friendReqUid);
  let uidLoadedDoc = await uidDoc.get().catch(() => {
    return { message: "errorInternalMyUid" };
  });
  let friendReqLoadedDoc = await friendReqDoc.get().catch(() => {
    return { message: "errorInternalFriendUid" };
  });
  if (
    !uidLoadedDoc.data().pendingFriendsRecv ||
    !friendReqLoadedDoc.data().pendingFriendsSent ||
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
            friends: admin.firestore.FieldValue.arrayUnion(friendReqDoc),
            pendingFriendsRecv:
              admin.firestore.FieldValue.arrayRemove(friendReqDoc),
          }
        : {
            pendingFriendsRecv:
              admin.firestore.FieldValue.arrayRemove(friendReqDoc),
          }
    )
    .then(async () => {
      try {
        await friendReqDoc.update(
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
        );
        return { message: "ok" };
      } catch {
        return { message: "errorUpdateFriend" };
      }
    })
    .catch(() => {
      return { message: "errorUpdateMe" };
    });
}

exports.answerFriendRequest = functions // manage accepted or rejected friend request
  .region("europe-west1")
  .https.onCall(async (data, context) =>
    answerFriendRequestAsync(data, context)
  );

exports.removeFriend = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
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
    const friendsDict = asyncGetFriends(uid);
    return friendsDict.then(async (res) => {
      if (res === -1)
        return {
          message: "errorGetFriends",
          friends: [],
          pendingFriendsRecv: [],
          pendingFriendsSent: [],
        };
      else {
        const friends = await this.getUsersInfo(res.friends);
        const pendingFriendsRecv = await this.getUsersInfo(
          res.pendingFriendsRecv
        );
        const pendingFriendsSent = await this.getUsersInfo(
          res.pendingFriendsSent
        );
        return {
          message:
            friends.message != "ok" ||
            pendingFriendsRecv.message != "ok" ||
            pendingFriendsSent.message != "ok"
              ? "errorGetFriendsInfo"
              : "ok",
          friends: friends.users,
          pendingFriendsRecv: pendingFriendsRecv.users,
          pendingFriendsSent: pendingFriendsSent.users,
        };
      }
    });
  });

async function asyncGetFriends(uid) {
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((record) => {
      if (record.exists) {
        return {
          friends: record.data().friends || [],
          pendingFriendsRecv: record.data().pendingFriendsRecv || [],
          pendingFriendsSent: record.data().pendingFriendsSent || [],
        };
      } else {
        return -1;
      }
    })
    .catch(() => {
      return -1;
    });
}

exports.getUsersInfo = async function getUsersInfo(users) {
  if (!users) return { message: "errorUsersUndefined", users: [] };
  let infos = [];
  let error = false;
  for (const user of users) {
    let getError = false;
    const userInfo = await admin
      .auth()
      .getUser(user.id)
      .catch(() => {
        getError = true;
        error = true;
      });
    if (!getError) {
      infos.push({
        name: userInfo.displayName,
        email: userInfo.email,
        id: userInfo.uid,
      });
    } else {
      error = true;
    }
  }
  return { message: error ? "errorFetchingUsers" : "ok", users: infos };
};

exports.getCurrentUserInfo = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    return this.getUsersInfo([db.collection("users").doc(uid)]);
  });

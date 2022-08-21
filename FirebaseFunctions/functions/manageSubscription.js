const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

/** Returns all the user's subs */
exports.getUserSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    const subs = asyncGetUserSubs(uid);
    return subs.then((res) => {
      if (res === -1) return { message: "errorGetUserSubs", subs: [] };
      else {
        return getSubscriptionsInfo(res).then((queryResult) => {
          return queryResult;
        });
      }
    });
  });

async function asyncGetUserSubs(uid) {
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((subs) => {
      if (subs.exists) {
        return subs.data().subscriptions;
      } else {
        return -1;
      }
    });
}

async function getSubscriptionsInfo(subs) {
  let infos = [];
  let error = false;
  for (const sub of subs) {
    const subInfo = await sub.get().catch(() => {
      error = true;
    });
    if (!error && subInfo.exists) {
      infos.push(
        craftSubscriptionInfoResponse({ ...subInfo.data(), id: subInfo.id })
      );
    } else {
      error = true;
    }
  }
  return { message: error ? "fetchingSubError" : "ok", subs: infos };
}

function craftSubscriptionInfoResponse(sub) {
  return { id: sub.id, name: sub.name, price: sub.price };
}

exports.setNewSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    return db
      .collection("subscriptions")
      .add({
        name: data.name,
        price: data.price,
        owner: db.collection("users").doc(uid),
        members: [db.collection("users").doc(uid)],
      })
      .then((ref) => {
        db.collection("users")
          .doc(uid)
          .update({ subscriptions: admin.firestore.FieldValue.arrayUnion(ref) })
          .catch((e) => console.log(e));
      });
  });

async function removeMemberFromSub(subRef, userRef) {
  return subRef
    .update({
      members: admin.firestore.FieldValue.arrayRemove(userRef),
    })
    .catch((e) => console.log(e));
}

async function removeSubFromMember(subRef, userRef) {
  return await userRef
    .update({
      subscriptions: admin.firestore.FieldValue.arrayRemove(subRef),
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
}

exports.deleteSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    const uid = context.auth.uid;
    const subToDelete = db.collection("subscriptions").doc(data.subscription);
    return subToDelete
      .get()
      .then((res) => {
        if (res.exists && this.checkSubOwnership(uid, res.data().owner.id))
          return subToDelete
            .delete()
            .then(() => {
              return { message: "subDeleted" };
            })
            .catch(() => {
              return { message: "errorDeletion" };
            });
        else
          return { message: res.exists ? "errorNotOwner" : "errorNotExists" };
      })
      .catch(() => {
        return { message: "errorDeletionException" };
      });
  });

exports.checkSubOwnership = function checkSubOwnership(uid, sub) {
  if (uid && sub) return uid === sub;
};

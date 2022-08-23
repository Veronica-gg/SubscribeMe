const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const { getUsersInfo } = require("./manageUser");
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
    let getError = false;
    const subInfo = await sub.get().catch(() => {
      getError = true; // one variable to check the single iteration
      error = true; // the other to check errors in the whole execution
    });
    if (!getError && subInfo.exists) {
      let membersInfo = await getUsersInfo(subInfo.data().members);
      infos.push(
        craftSubscriptionInfoResponse({
          ...subInfo.data(),
          id: subInfo.id,
          members: membersInfo,
        })
      );
    } else {
      error = true;
    }
  }
  return { message: error ? "fetchingSubError" : "ok", subs: infos };
}

function craftSubscriptionInfoResponse(sub) {
  return { id: sub.id, name: sub.name, price: sub.price, members: sub.members };
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
        members: [db.collection("users").doc(uid)], // adding myself as member? For now useful to debug, then TODO
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
    .catch((e) => {
      console.log(e);
      return false;
    });
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

exports.removeMember = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let error = false;
    const uid = context.auth.uid;
    const subRef = db.collection("subscriptions").doc(data.subscription);
    const subInfo = await subRef.get().catch(() => {
      error = true;
    });
    if (
      error ||
      !this.allowedToChangeMembers(
        uid,
        subInfo.data().owner,
        subInfo.data().members
      )
    )
      return { message: "errorNotAllowed" };
    const uidToDelete = this.checkSubOwnership(uid, subInfo.data().owner)
      ? data.userToRemove
      : uid;
    const refUidToDelete = db.collection(uid).doc(uidToDelete);
    return removeSubFromMember(subRef, refUidToDelete).then((isRemoved) => {
      if (isRemoved) {
        return removeMemberFromSub(subRef, refUidToDelete).then((res) => {
          if (res) return { message: "ok" };
          else return { message: "errorRemoveMemberFromSub" };
        });
      } else return { message: "errorRemoveSubFromMember" };
    });
  });

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

exports.checkSubOwnership = function checkSubOwnership(uid, subOwner) {
  if (uid && subOwner) return uid === subOwner;
};

exports.allowedToChangeMembers = function allowedToChangeMembers(
  uid,
  owner,
  members
) {
  if (checkSubOwnership(uid, owner)) return true;
  for (const member of members) {
    if (checkSubOwnership(uid, member)) return true;
  }
  return false;
};

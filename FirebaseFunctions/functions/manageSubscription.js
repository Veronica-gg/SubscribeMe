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
        return getSubscriptionsInfo(res, uid).then((queryResult) => {
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

async function getSubscriptionsInfo(subs, uid) {
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
        craftSubscriptionInfoResponse(
          {
            ...subInfo.data(),
            id: subInfo.id,
            members: membersInfo,
          },
          uid
        )
      );
    } else {
      error = true;
    }
  }
  return { message: error ? "fetchingSubError" : "ok", subs: infos };
}

function craftSubscriptionInfoResponse(sub, uid) {
  return {
    id: sub.id,
    autoRenewal: sub.autoRenewal,
    card: sub.card,
    category: sub.category,
    currency: sub.currency,
    customName: sub.customName,
    customType: sub.customType,
    name: sub.name,
    owner: sub.owner.id === uid,
    price: sub.price,
    renewalDate: sub.renewalDate,
    renewalEach: sub.renewalEach,
    renewalPeriod: sub.renewalPeriod,
    type: sub.type,
  };
}

function parseInputSubData(sub, uid) {
  let members = [];
  for (const member of sub.members || []) {
    members.push(db.collection("users").doc(member));
  }
  return {
    name: sub.name || "other",
    customName: sub.customName || "Unknown",
    price: sub.price || 0,
    currency: sub.currency || "eur",
    owner: db.collection("users").doc(uid),
    members: members,
    renewalDate: sub.date || new Date(Date.now()).toDateString(),
    renewalPeriod: sub.renewalPeriod || "none",
    renewalEach: sub.renewalEach || 0,
    category: sub.category || "other",
    type: sub.type || "other",
    customType: sub.customType || "Other",
    card: sub.card || "0000",
    autoRenewal: sub.autoRenewal || false,
  };
}

exports.setNewSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    return db
      .collection("subscriptions")
      .add(parseInputSubData(data, uid))
      .then(async (ref) => {
        let error = false;
        for (const user of [
          ...parseInputSubData(data, uid).members,
          db.collection("users").doc(uid),
        ]) {
          console.log(user);
          error |= await user
            .update({
              subscriptions: admin.firestore.FieldValue.arrayUnion(ref),
            })
            .then(() => {
              return true;
            })
            .catch(() => {
              return false;
            });
        }
        console.log(error);
        return error ? { message: "errorAddSubToUser" } : { message: "ok" };
      })
      .catch(() => {
        return { message: "errorSubNotAdded" };
      });
  });

exports.editSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    const uid = context.auth.uid;
    const subscription = db.collection("subscriptions").doc(data.id); // TODO -- check owner
    return subscription
      .set(
        {
          name: data.name,
          price: data.price,
          owner: db.collection("users").doc(uid),
          members: [db.collection("users").doc(uid)], // adding myself as member? For now useful to debug, then TODO
        },
        { merge: true }
      )
      .then(() => {
        return subscription
          .get()
          .then(async (res) => {
            if (res.exists) {
              let membersInfo = await getUsersInfo(res.data().members);
              let subCrafted = craftSubscriptionInfoResponse(
                {
                  ...res.data(),
                  id: res.id,
                  members: membersInfo,
                },
                uid
              );
              return { message: "ok", subs: subCrafted };
            } else return { message: "errorCouldNotEdit" };
          })
          .catch(() => {
            return { message: "errorCouldNotEdit" };
          }); // TODO IMPORTANT, trigger to change members
      })
      .catch(() => {
        return { message: "errorCouldNotEdit" };
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

exports.removeSubFromMember = async function removeSubFromMember(
  subRef,
  userRef
) {
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
};

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
              return { message: "ok" };
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

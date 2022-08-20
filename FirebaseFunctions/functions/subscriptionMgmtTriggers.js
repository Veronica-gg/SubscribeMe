const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

exports.onSubDelete = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onDelete((snap, context) => {
    const deletedValue = snap.data();
  });

async function removeMemberFromSub(subRef, userRef) {
  return await subRef
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
    .then((res) => {
      return 1;
    })
    .catch((e) => console.log(e));
}

exports.dummy = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    return removeSubFromMember(
      db.collection("subscriptions").doc("fHB3MTeYy17N7gGfbg3v"),
      db.collection("users").doc("YuIk32uY28OLnwSXXQALVyIjK4D2")
    );
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
          subToDelete
            .delete()
            .then(() => {
              return { message: "subDeleted" };
            })
            .catch(() => {
              return { message: "error" };
            });
        else return { message: "error" };
      })
      .catch(() => {
        return { message: "error" };
      });
  });

exports.checkSubOwnership = function checkSubOwnership(uid, sub) {
  if (uid === null || sub === null) return false;
  return uid === sub;
};

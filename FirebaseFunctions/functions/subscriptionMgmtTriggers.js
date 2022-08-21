const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

exports.onSubDelete = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onDelete(async (snap, context) => {
    const deletedValue = snap.data();
    for (const member of deletedValue.members) {
      await removeSubFromMember(snap.ref, member);
    }
  });

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

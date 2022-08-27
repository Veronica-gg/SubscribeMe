const functions = require("firebase-functions");
const { removeSubFromMember } = require("./manageSubscription");

exports.onSubDelete = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onDelete(async (snap) => {
    const deletedValue = snap.data();
    for (const member of [...deletedValue.members, deletedValue.owner]) {
      await removeSubFromMember(snap.ref, member);
    }
  });

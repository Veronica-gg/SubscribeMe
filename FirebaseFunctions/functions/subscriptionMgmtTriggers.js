const functions = require("firebase-functions");
const { removeSubFromMember } = require("./manageSubscription");
const admin = require("firebase-admin");

exports.onSubDelete = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onDelete(async (snap) => {
    const deletedValue = snap.data();
    for (const member of [...deletedValue.members, deletedValue.owner]) {
      await removeSubFromMember(snap.ref, member);
    }
  });

exports.onSubEdited = functions
  .region("europe-west1")
  .firestore.document("/subscriptions/{subId}")
  .onUpdate(async (snap) => {
    const beforeMembers = snap.before.data().members;
    const afterMembers = snap.after.data().members;
    let toRemoveBefore = beforeMembers.filter((value) => {
      return !afterMembers.find((el) => {
        el.isEqual(value);
      });
    });
    let toAddAfter = afterMembers.filter((value) => {
      return !beforeMembers.find((el) => {
        el.isEqual(value);
      });
    });
    for (const member of toRemoveBefore) {
      await removeSubFromMember(snap.before.ref, member);
    }
    for (const member of toAddAfter) {
      await member.update({
        subscriptions: admin.firestore.FieldValue.arrayUnion(snap.after.ref),
      });
    }
  });

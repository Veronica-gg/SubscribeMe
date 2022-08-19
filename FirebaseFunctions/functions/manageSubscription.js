const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");
const db = admin.firestore();

exports.getUserSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    const subs = asyncGetUserSubs(uid);
    return subs.then((res) => {
      return getSubscriptionsInfo(res).then((queryResult) => {
        if (queryResult == -1) return { error: "Error while fetching data." };
        else return queryResult;
      });
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
  for (const sub of subs) {
    const subInfo = await sub.get();
    if (subInfo.exists) {
      infos.push(
        craftSubscriptionInfoResponse({ ...subInfo.data(), id: subInfo.id })
      );
    } else {
      return -1;
    }
  }
  return infos;
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
      })
      .then((ref) => {
        db.collection("users")
          .doc(uid)
          .update({ subscriptions: admin.firestore.FieldValue.arrayUnion(ref) })
          .catch((e) => console.log(e));
      });
  });

const firestore = require("firebase/firestore");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
        return subs.data().subscription;
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
      infos.push(craftSubscriptionInfoResponse(subInfo.data()));
    } else {
      return -1;
    }
  }
  return infos;
}

function craftSubscriptionInfoResponse(sub) {
  return { name: sub.name, price: sub.price };
}

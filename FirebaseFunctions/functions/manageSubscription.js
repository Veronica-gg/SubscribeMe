const firestore = require("firebase/firestore");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

exports.getUserSubscription = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    let uid = context.auth.uid;
    const subs = asyncGetUserSubs(uid);
    subs.then((res) => {
      //res.forEach();
    });
    // return db
    //   .collection("users")
    //   .doc(uid)
    //   .get()
    //   .then((doc) => {
    //     if (!doc.exists) {
    //       return { message: "NOOO" };
    //     } else {
    //       return getSubscription(doc.data().subscription);
    //     }
    //     console.log(v);
    //     //console.log(v.data().name);
    //   })
    //   .catch((e) => {
    //     return { error: e };
    //   });
  });

async function asyncGetUserSubs(uid) {
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((subs) => {
      if (!subs.exists) {
        return [];
      } else {
        return subs.data().subscription;
      }
    });
}

async function getSubscriptionInfo(subId) {
  console.log("here");
  const subInfo = await sub.get().then((el) => {
    return el.data().name;
  });
}

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.manageSubscription = require("./manageSubscription.js");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send({
      result: admin.auth().deleteUser("F70mUSZFSkRcJwEsfYrWQP34Zgx2"),
    });
    // const q = query(
    //   collection(firestore, "users"),
    //   where(documentId(), "==", auth.currentUser.uid)
    // );
    // getDocs(q).then((v) => {
    //   v.forEach((doc) => {
    //     console.log(doc.get("subscription")[0]);
    //   });
    //   //console.log(docs);
    // });
  });

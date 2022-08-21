const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.manageSubscription = require("./manageSubscription.js");
exports.userMgmtTriggers = require("./userMgmtTriggers");
exports.subscriptionMgmtTriggers = require("./subscriptionMgmtTriggers.js");
exports.manageUser = require("./manageUser.js");

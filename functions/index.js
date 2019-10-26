const functions = require("firebase-functions");
const handleCustomerUpdate = require("./handleCustomerUpdate");
const { sendWelcomeEmail, sendSalesEmail } = require("./newUserhandlers");

// All triggers for customers updates
exports.onCustomerUpdate = functions.firestore.document("customers/{uid}").onUpdate(handleCustomerUpdate);

// Sends a welcome email to new user.
exports.sendWelcomeEmail = functions.auth.user().onCreate(user => sendWelcomeEmail(user.email));

// Send an email to the Sales Team Letting them know there is a new application to process.
exports.sendSalesEmail = functions.auth.user().onCreate(user => sendSalesEmail(user.email));

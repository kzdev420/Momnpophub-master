const functions = require("firebase-functions");
const handleCustomerUpdate = require("./handleCustomerUpdate");
const handleNewCustomer = require("./handleNewCustomer");

// triggers for customers updates
exports.onCustomerUpdate = functions.firestore.document("customers/{uid}").onUpdate(handleCustomerUpdate);

// triggers for new customers
exports.onNewCustomer = functions.firestore.document("customers/{uid}").onCreate(handleNewCustomer);

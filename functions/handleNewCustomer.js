const validator = require("validator");
const sendEmailConfirmations = require("./sendEmailConfirmations.js");

module.exports = handleNewCustomer = (snap, _context) => {
  if (!validator.isEmail(snap.data().data.email)) {
    return console.error("Invalid email submitted");
  }

  sendEmailConfirmations(snap.data().data);

  // set default values for status and disabled
  console.log("setting status and disabled of new customers");
  return snap.ref.update({ status: false, disabled: false });
};

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const handleCustomerUpdate = require("./handleCustomerUpdate");

exports.onCustomerUpdate = functions.firestore.document("customers/{uid}").onUpdate(handleCustomerUpdate);

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = "sales@momnpophub.com"; //functions.config().gmail.email;
const gmailPassword = "Diamond5137"; //functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = "Mom N Pop Hub";

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  //const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email);
});
// [END sendWelcomeEmail]

// [START sendSalesEmail]
/**
 * Send an email to the Sales Team Letting them know there is a new application to process.
 */
// [START onCreateTrigger]
exports.sendSalesEmail = functions.auth.user().onCreate(user => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email;
  // [END eventAttributes]

  return sendSalesEmail(email);
});

//  const email = user.email;
//  const displayName = user.displayName;

//  return sendGoodbyeEmail(email, displayName);
//});
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // Mail Options
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Welcome to ${APP_NAME}. Thank you for submitting your application.  One of our sales representatives will be contacting you within the next couple of business days to set you up on our platform, and start attracting new customers to your business. If you have any questions, please contact our support team at: 'mailto:contact@momnpophub.com'.`;
  await mailTransport.sendMail(mailOptions);
  return null;
}

// Sends an email notification to the sales team about a new signup.
async function sendSalesEmail(email) {
  const mailOptions = {
    from: `${APP_NAME}`,
    to: "sales@momnpophub.com"
  };

  // Mail Options
  mailOptions.subject = `New Application for ${APP_NAME}`;
  mailOptions.text = `A new applicant for ${APP_NAME} just signed up using the email address: ${email}.  Please log onto the Super Admin to process the application.  Thank you.`;
  await mailTransport.sendMail(mailOptions);
  return null;
}

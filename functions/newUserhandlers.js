const nodemailer = require("nodemailer");

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = "Mom N Pop Hub";

// Configure the email transport using the default SMTP transport and a GMail account.
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

// Sends a welcome email to the given user.
module.exports.sendWelcomeEmail = async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // Mail Options
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Welcome to ${APP_NAME}. Thank you for submitting your application.  One of our sales representatives will be contacting you within the next couple of business days to set you up on our platform, and start attracting new customers to your business. If you have any questions, please contact our support team at: 'mailto:contact@momnpophub.com'.`;
  await mailTransport.sendMail(mailOptions);
  return null;
};

// Sends an email notification to the sales team about a new signup.
module.exports.sendSalesEmail = async function sendSalesEmail(email) {
  const mailOptions = {
    from: `${APP_NAME}`,
    to: "sales@momnpophub.com"
  };

  // Mail Options
  mailOptions.subject = `New Application for ${APP_NAME}`;
  mailOptions.text = `A new applicant for ${APP_NAME} just signed up using the email address: ${email}.  Please log onto the Super Admin to process the application.  Thank you.`;
  await mailTransport.sendMail(mailOptions);
  return null;
};

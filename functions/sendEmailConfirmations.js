const nodemailer = require("nodemailer");

module.exports = async function sendEmailConfirmations(user) {
  const date = new Date().toLocaleString("en-US");

  // Configure email transport
  const senderEmail = "contact@momnpophub.com";
  const senderPassword = "comomnpop5137";
  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPassword
    }
  });

  const customerMailOptions = {
    from: '"Mom n Pop Hub" <contact@momnpophub.com>',
    to: user.email,
    subject: "Thanks for reaching out!",
    html: `
        <p>Dear ${user.firstName} ${user.lastName},</p>
        <p>Thanks for getting in touch with Mom n Pop Hub. We are reviewing the information about your business- ${user.businessName} and should have a personal Invite ready in 2-3 business days. In the meantime, if you have questions please respond to this email and we will revert back to you.</p>
        <p>Mom n Pop Hub Team</p>
        <p>momnpophub.com</p>
        <p><img src="https://momnpophub.com/static/media/momnpophub-logo.4b99a70d.png" /></p>

        <p>
        <a href="https://www.facebook.com/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/facebook-48.png?alt=media&token=9e7ece09-e5c6-4228-87c4-96623db0db47" alt="facebook" width="24" height="24"/></a> 

        <a href="https://www.linkedin.com/company/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/linkedin-32.png?alt=media&token=8df60339-4774-496b-b43b-7c0e67f9e83f" alt="linkedin" width="24" height="24"></a>

        <a href="https://www.youtube.com/channel/UCJPIGMXPga0AM_1OrvQU55Q/"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/youtube-48.png?alt=media&token=702a69ba-c792-4ff7-9f65-a05e43c44abe" alt="youtube" width="24" height="24"></a>
        </p>`
  };

  const salesEmail = "sales@momnpophub.com";
  const salesMailOptions = {
    from: '"Mom n Pop Hub" <contact@momnpophub.com>',
    to: salesEmail,
    subject: `New Application - ${date}`,
    text: `A new applicant - ${user.firstName} ${user.lastName} from ${user.businessName} having ${user.businessPhone} and ${user.email} submitted request to join Mom n Pop Hub. Please process the application.`
  };

  try {
    await mailTransport.sendMail(customerMailOptions);
    console.log(`New subscription confirmation email sent to:`, user.email);
    await mailTransport.sendMail(salesMailOptions);
    console.log(`New subscription confirmation email sent to:`, salesEmail);
  } catch (error) {
    console.error("There was an error while sending emails:", error);
  }
};

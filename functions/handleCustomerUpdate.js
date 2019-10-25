const nodemailer = require("nodemailer");

module.exports = async function handleCustomerUpdate(change, context) {
  const old = change.before.data();
  const updated = change.after.data();

  if (old.status !== updated.status && updated.status === true) {
    sendApprovalEmail(updated.data);
  } else if (old.disable !== updated.disable && updated.disable === true) {
    sendRejectionEmail(updated.data);
  }
};

async function sendApprovalEmail({ email, firstName, lastName, businessName }) {
  const customerMailOptions = {
    from: '"Mom n Pop Hub" <contact@momnpophub.com>',
    to: email,
    subject: "Your business was approved!",
    html: `<p>Dear ${firstName} ${lastName},</p>
          <p>Congratulations, ${businessName} was approved to join Mom n Pop Hub.</p>
          <p>Please let us know if you have any questions. You can simply respond to this email or reach us at contact@momnpophub.com.</p>
          <p>Mom n Pop Hub Team</p>
          <p>momnpophub.com</p>
          <p><img src="https://momnpophub.com/static/media/momnpophub-logo.4b99a70d.png" /></p>
          <p><a href="https://www.facebook.com/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/facebook-48.png?alt=media&token=9e7ece09-e5c6-4228-87c4-96623db0db47" alt="facebook" width="24" height="24"/></a> 
          <a href="https://www.linkedin.com/company/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/linkedin-32.png?alt=media&token=8df60339-4774-496b-b43b-7c0e67f9e83f" alt="linkedin" width="24" height="24"></a>
          <a href="https://www.youtube.com/channel/UCJPIGMXPga0AM_1OrvQU55Q/"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/youtube-48.png?alt=media&token=702a69ba-c792-4ff7-9f65-a05e43c44abe" alt="youtube" width="24" height="24"></a> </p>`
  };

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

  try {
    await mailTransport.sendMail(customerMailOptions);
    console.log(`Approval email was sent to`, email);
  } catch (error) {
    console.error("There was an error while sending approval email", error);
  }
}

async function sendRejectionEmail({ email, firstName, lastName, businessName }) {
  const customerMailOptions = {
    from: '"Mom n Pop Hub" <contact@momnpophub.com>',
    to: email,
    subject: "Your business was rejected!",
    html: `
    <p>Dear ${firstName} ${lastName},</p>
    <p>Thanks for applying to Mom n Pop Hub.</p>
    <p>At this point, we couldn't get your business approved for Mom n Pop Hub. This might be due to your business -  ${businessName} being a large business or limited availability of seats for small businesses on our platform. We will keep your information on file and will connect with you in near future. If you would like us to delete your information from our platform. Please respond to this email with the request and we will immediately delete your business and personal information from our databases.</P>
    <p>Mom n Pop Hub Team</p>
    <p>momnpophub.com</p>
    <p><img src="https://momnpophub.com/static/media/momnpophub-logo.4b99a70d.png" /></p>
    <p><a href="https://www.facebook.com/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/facebook-48.png?alt=media&token=9e7ece09-e5c6-4228-87c4-96623db0db47" alt="facebook" width="24" height="24"/></a> 
    <a href="https://www.linkedin.com/company/momnpophub"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/linkedin-32.png?alt=media&token=8df60339-4774-496b-b43b-7c0e67f9e83f" alt="linkedin" width="24" height="24"></a>
    <a href="https://www.youtube.com/channel/UCJPIGMXPga0AM_1OrvQU55Q/"><img src="https://firebasestorage.googleapis.com/v0/b/momnpophub-dev-qa.appspot.com/o/youtube-48.png?alt=media&token=702a69ba-c792-4ff7-9f65-a05e43c44abe" alt="youtube" width="24" height="24"></a> </p>`
  };

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

  try {
    await mailTransport.sendMail(customerMailOptions);
    console.log(`Rejection email was sent to`, email);
  } catch (error) {
    console.error("There was an error while sending rejection email", error);
  }
}

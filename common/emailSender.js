const nodemailer = require("nodemailer");
const inviteTemplate = require("../const/emailTemplates");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function sendInviteToProject(email, username, companyName, password) {
  const link = `${process.env.BASE_URL}/login`;
  const markup = inviteTemplate(email, password, username);
  await transport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Invite",
    text: `Dear ${username}! You have been added to the ${companyName}. Now you can take a plot in it. Link to the project - ${link}`,
    html: markup,
  });
}

module.exports = {
  sendInviteToProject,
};

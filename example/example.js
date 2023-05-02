const EmailSender = require("../EmailSender");
require("dotenv").config({ path: "./.env" });

const to = "rakethost@gmail.com";
const subject = "Welcome to My App";
const textBody = "Thank you for signing up!";
const htmlBody = "<h1>Thank you for signing up!</h1>";

const emailSender = new EmailSender(to, subject, textBody, htmlBody);

emailSender
  .send()
  .then(() => {
    console.log("Email sent successfully");
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });

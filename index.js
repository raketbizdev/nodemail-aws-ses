const fs = require("fs");
const path = require("path");
const EmailSender = require("./emailSender");

require("dotenv").config();

const [email, subject] = process.argv.slice(2);

if (!email || !subject) {
  console.error("Usage: node index.js <email> <subject>");
  process.exit(1);
}

const textFilePath = path.join(__dirname, "email.txt");
const htmlFilePath = path.join(__dirname, "email.html");

fs.readFile(textFilePath, "utf8", (err, textBody) => {
  if (err) {
    console.error("Error reading text email file:", err);
    return;
  }

  fs.readFile(htmlFilePath, "utf8", (err, htmlBody) => {
    if (err) {
      console.error("Error reading HTML email file:", err);
      return;
    }

    const emailSender = new EmailSender(email, subject, textBody, htmlBody);
    emailSender
      .send()
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  });
});

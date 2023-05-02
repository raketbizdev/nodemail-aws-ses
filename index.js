// Import required modules
const fs = require("fs"); // File system module for reading files
const path = require("path"); // Path module for handling file paths
const EmailSender = require("./emailSender"); // Custom EmailSender module for sending emails

// Load environment variables from .env file
require("dotenv").config();

// Extract command line arguments: email and subject
const [email, subject] = process.argv.slice(2);

// Validate that email and subject are provided as command line arguments
if (!email || !subject) {
  console.error("Usage: node index.js <email> <subject>");
  process.exit(1);
}

// Set up file paths for email content
const textFilePath = path.join(__dirname, "email.txt");
const htmlFilePath = path.join(__dirname, "email.html");

// Read the plain text email content from email.txt
fs.readFile(textFilePath, "utf8", (err, textBody) => {
  if (err) {
    console.error("Error reading text email file:", err);
    return;
  }

  // Read the HTML email content from email.html
  fs.readFile(htmlFilePath, "utf8", (err, htmlBody) => {
    if (err) {
      console.error("Error reading HTML email file:", err);
      return;
    }

    // Create a new EmailSender instance with the given email, subject, and email content
    const emailSender = new EmailSender(email, subject, textBody, htmlBody);

    // Send the email using the EmailSender instance
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

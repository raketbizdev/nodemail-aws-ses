// Import AWS SDK and load environment variables from .env file
const AWS = require("aws-sdk");
require("dotenv").config();

// Configure AWS SDK with access keys and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an SES (Simple Email Service) instance with the specified API version
const SES = new AWS.SES({ apiVersion: "2010-12-01" });

// Define the EmailSender class
class EmailSender {
  // Constructor takes recipient email, subject, plain text body, and HTML body as arguments
  constructor(to, subject, textBody, htmlBody) {
    this.to = to;
    this.subject = subject;
    this.textBody = textBody;
    this.htmlBody = htmlBody;
  }

  // Validate the email format using a regex pattern
  validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  // Asynchronous method to send the email using AWS SES
  async send() {
    // Create the email body object, including plain text and/or HTML content
    const body = {};

    if (this.textBody) {
      body.Text = {
        Charset: "UTF-8",
        Data: this.textBody,
      };
    }

    if (this.htmlBody) {
      body.Html = {
        Charset: "UTF-8",
        Data: this.htmlBody,
      };
    }

    // Define the parameters for the SES sendEmail method
    const params = {
      Destination: {
        ToAddresses: [this.to], // Set the recipient email address
      },
      Message: {
        Body: body, // Set the email content
        Subject: {
          Charset: "UTF-8",
          Data: this.subject, // Set the email subject
        },
      },
      Source: process.env.SENDER_EMAIL, // Set the sender email address from environment variable
    };

    // Try sending the email using SES and log the result, or catch and log any errors
    try {
      const result = await SES.sendEmail(params).promise();
      console.log("Email sent:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

// Export the EmailSender class for use in other modules
module.exports = EmailSender;

const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const SES = new AWS.SES({ apiVersion: "2010-12-01" });

class EmailSender {
  constructor(to, subject, textBody, htmlBody) {
    this.to = to;
    this.subject = subject;
    this.textBody = textBody;
    this.htmlBody = htmlBody;
  }
  validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }
  async send() {
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

    const params = {
      Destination: {
        ToAddresses: [this.to],
      },
      Message: {
        Body: body,
        Subject: {
          Charset: "UTF-8",
          Data: this.subject,
        },
      },
      Source: process.env.SENDER_EMAIL,
    };

    try {
      const result = await SES.sendEmail(params).promise();
      console.log("Email sent:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

module.exports = EmailSender;

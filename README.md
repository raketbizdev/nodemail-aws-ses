# Nodemail AWS SES

Nodemail AWS SES is a Node.js package that provides a simple and easy way to send emails using Amazon SES (Simple Email Service). It provides an EmailSender class that takes care of sending emails using the AWS SDK, with options for both HTML and text emails.

## Prerequisites

- Node.js installed on your system
- An AWS account with SES enabled
- AWS credentials with permissions to use SES

## Installation

```bash
  npm install nodemail-aws-ses
```

## Usage

First, you need to set up your AWS credentials in a `.env` file or through environment variables. You can use the following format in your `.env.example` file inside example directory:

```bash
  AWS_ACCESS_KEY_ID=your_access_key
  AWS_SECRET_ACCESS_KEY=your_secret_access_key
  AWS_REGION=your_aws_region
```

### Basic Example

Go to example directory and run the following command:
make sure you create `.env` file from `env.example`.

```bash
cd example
node example.js
```

### Example with Express.js

Create an Express.js application and use the package to send emails through a POST request.

1. Install Express and body-parser:

```bash
npm install express body-parser
```

2. Create an `app.js` file with the following content:

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const EmailSender = require("nodemail-aws-ses");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { to, subject, bodyText, bodyHtml } = req.body;

  const emailSender = new EmailSender(to, subject, bodyText, bodyHtml);
  emailSender
    .send()
    .then(() => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

3. Start your Express.js application:

```bash
node app.js
```

4. Send a POST request to the /send-email endpoint with the required parameters:

```json
{
  "to": "recipient@example.com",
  "subject": "Welcome to My App",
  "bodyText": "Thank you for signing up!",
  "bodyHtml": "<h1>Thank you for signing up!</h1>"
}
```

For more examples and usage details, please refer to the example directory.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.

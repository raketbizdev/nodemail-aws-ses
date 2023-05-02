# nodemail-aws-ses

A simple Node.js package for sending emails using AWS SES (Simple Email Service) with a focus on Object-Oriented Programming (OOP) and the DRY (Don't Repeat Yourself) principle.

## Prerequisites

- Node.js installed on your system
- An AWS account with SES enabled
- AWS credentials with permissions to use SES

## Installation

1. Clone this repository or download the source code.

```bash
git clone https://github.com/yourusername/nodemail-aws-ses.git
```

2. Navigate to the project directory and install the dependencies.

```bash
cd nodemail-aws-ses
npm install
```

3. Set up environment variables by creating a `.env` file in the project root directory with the following content:

```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
SENDER_EMAIL=no-reply@yourdomain.com
```

Replace `your_access_key`, `your_secret_key`, `your_region`, and `no-reply@yourdomain.com` with your actual AWS credentials, region, and sender email.

## Usage

To send an email, run the following command:

```bash
node index.js <email> <subject> <body>
```

Replace `<email>`, `<subject>`, and `<body>` with the recipient's email address, the email subject, and the email body text, respectively.

For example:

```bash
node index.js someone@example.com "Welcome to My App" "Thank you for signing up!"
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.

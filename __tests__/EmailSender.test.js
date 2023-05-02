const EmailSender = require("../EmailSender");

describe("EmailSender", () => {
  it("should instantiate the class with the correct properties", () => {
    const to = "recipient@example.com";
    const subject = "Test Subject";
    const textBody = "Test text body";
    const htmlBody = "<h1>Test HTML body</h1>";

    const emailSender = new EmailSender(to, subject, textBody, htmlBody);

    expect(emailSender.to).toEqual(to);
    expect(emailSender.subject).toEqual(subject);
    expect(emailSender.textBody).toEqual(textBody);
    expect(emailSender.htmlBody).toEqual(htmlBody);
  });

  // Add more test cases here as needed
});
describe("EmailSender", () => {
  test("should validate email format", () => {
    const to = "recipient@example.com";
    const subject = "Test subject";
    const body = "Test body";

    const emailSender = new EmailSender(to, subject, body);

    const isValidEmail = emailSender.validateEmail(to);

    expect(isValidEmail).toBe(true);
  });
});

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const buildHtml = (title: string, message: string, code: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>${title}</h2>
    <p>${message}</p>
    <h3 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h3>
    <p>This code will expire in 10 minutes.</p>
  </div>
`;

const sendEmail = async (
  to: string,
  subject: string,
  title: string,
  message: string,
  code: string
) => {
  return transporter.sendMail({
    from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `${message} Code: ${code}`,
    html: buildHtml(title, message, code),
  });
};

// Public functions
export const sendVerificationEmail = (to: string, code: string) =>
  sendEmail(
    to,
    "Verify your email address",
    "Email Verification",
    "Thank you for registering. Use the code below to verify your email:",
    code
  );

export const sendForgotVerificationEmail = (to: string, code: string) =>
  sendEmail(
    to,
    "Reset Your Password – Verification Code",
    "Forgot Password Verification",
    "You requested to reset your password. Use the verification code below to continue:",
    code
  );

export const sendStaffVerificationEmail = (to: string, code: string) =>
  sendEmail(
    to,
    "Verify your email address",
    "Email Verification",
    "Use the code below to verify the staff account:",
    code
  );

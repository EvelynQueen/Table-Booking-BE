import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // use an App Password if using Gmail
    },
  });

  const mailOptions = {
    from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email address",
    text: `Your verification code is: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Email Verification</h2>
        <p>Thank you for registering. Use the code below to verify your email:</p>
        <h3 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h3>
        <p>This code will expire in 10 minutes. Please complete verification promptly.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendForgotVerificationEmail = async (to: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password – Verification Code",
    text: `Your password reset verification code is: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Forgot Password Verification</h2>
        <p>You requested to reset your password. Use the verification code below to continue:</p>
        <h3 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h3>
        <p>This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

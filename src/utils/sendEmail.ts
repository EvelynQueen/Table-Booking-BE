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
        <p>This code will expire soon. Please complete verification promptly.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

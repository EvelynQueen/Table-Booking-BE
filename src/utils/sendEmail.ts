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

const sendVerifyEmail = async (
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
  sendVerifyEmail(
    to,
    "Verify your email address",
    "Email Verification",
    "Thank you for registering. Use the code below to verify your email:",
    code
  );

export const sendForgotVerificationEmail = (to: string, code: string) =>
  sendVerifyEmail(
    to,
    "Reset Your Password – Verification Code",
    "Forgot Password Verification",
    "You requested to reset your password. Use the verification code below to continue:",
    code
  );

export const sendStaffVerificationEmail = (to: string, code: string) =>
  sendVerifyEmail(
    to,
    "Verify your email address",
    "Email Verification",
    "Use the code below to verify the staff account:",
    code
  );

// Staff Email
export const sendCreateStaffEmail = async (
  to: string,
  staffName: string,
  staffEmail: string,
  staffNumber: string
) => {
  try {
    const mailOptions = {
      from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "A New Staff Account Has Been Created",
      html: `
        <h2>New Staff Account Created</h2>
        <p>A staff account has just been created in your system.</p>
        <h3>Staff Information</h3>
        <ul>
          <li><b>Name:</b> ${staffName}</li>
          <li><b>Email:</b> ${staffEmail}</li>
          <li><b>Email:</b> ${staffNumber}</li>
        </ul>
        <p>If this was not done by you, please check your system immediately.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send owner notification email:", error);
    return false;
  }
};

export const sendDeleteStaffEmail = async (
  to: string,
  staffName: string,
  staffEmail: string,
  staffNumber: string
) => {
  try {
    const mailOptions = {
      from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "A Staff Account Has Been Deleted",
      html: `
        <h2>Staff Account Deleted</h2>
        <p>A staff account has just been deleted in your system.</p>
        <h3>Staff Information</h3>
        <ul>
          <li><b>Name:</b> ${staffName}</li>
          <li><b>Email:</b> ${staffEmail}</li>
          <li><b>Email:</b> ${staffNumber}</li>
        </ul>
        <p>If this was not done by you, please check your system immediately.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send owner notification email:", error);
    return false;
  }
};

// Table Email
export const modTableMail = async (
  action: string,
  to: string,
  code: string,
  floorName: string,
  floor: number,
  seat: number,
  status: string
) => {
  try {
    const mailOptions = {
      from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `A Table Has Been ${action}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background:#faf6f1; border:1px solid #e0d6c8; border-radius:10px;">
        <h2 style="color:#8b4513; border-bottom:2px solid #d4b48c; padding-bottom:5px;">🍽️ Table ${action}</h2>
        <p style="font-size:15px; color:#4a4a4a;">
          A table has just been ${action} from your restaurant management system.
        </p>
        <h3 style="color:#a0522d; margin-top:20px;">Table Details</h3>
        <ul style="list-style:none; padding-left:0; font-size:15px; color:#333;">
          <li style="margin-bottom:6px;">
            <b>Table Code:</b> ${code}
          </li>
          <li style="margin-bottom:6px;">
            <b>Number of Seats:</b> ${seat}
          </li>
          <li style="margin-bottom:6px;">
            <b>Floor Name:</b> ${floorName}
          </li>
          <li style="margin-bottom:6px;">
            <b>Floor Area:</b> ${floor}
          </li>
          <li style="margin-bottom:6px;">
            <b>Status:</b> ${status}
          </li>
        </ul>
        <p style="margin-top:20px; font-size:14px; color:#6b4f3a;">
          If you did not perform this action, please review your system activity immediately.
        </p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send owner notification email:", error);
    return false;
  }
};

export const modFloorMail = async (
  action: string,
  to: string,
  floor: number,
  floorName: string,
  status: string
) => {
  try {
    const mailOptions = {
      from: `"VietCuisine" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `A Floor Has Been ${action}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background:#faf6f1; border:1px solid #e0d6c8; border-radius:10px;">
        <h2 style="color:#8b4513; border-bottom:2px solid #d4b48c; padding-bottom:5px;">🍽️ Table ${action}</h2>
        <p style="font-size:15px; color:#4a4a4a;">
          A table has just been ${action} from your restaurant management system.
        </p>
        <h3 style="color:#a0522d; margin-top:20px;">Table Details</h3>
        <ul style="list-style:none; padding-left:0; font-size:15px; color:#333;">
          <li style="margin-bottom:6px;">
            <b>Floor:</b> ${floor}
          </li>
          <li style="margin-bottom:6px;">
            <b>Floor Name:</b> ${floorName}
          </li>
          <li style="margin-bottom:6px;">
            <b>Status:</b> ${status}
          </li>
        </ul>
        <p style="margin-top:20px; font-size:14px; color:#6b4f3a;">
          If you did not perform this action, please review your system activity immediately.
        </p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send owner notification email:", error);
    return false;
  }
};

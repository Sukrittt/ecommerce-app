const nodemailer = require("nodemailer");
const crypto = require("crypto");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sukritsahatemp@gmail.com",
      pass: "okay jrnh aeor jeuo",
    },
  });

  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.140.150:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error", error);
  }
};

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

module.exports = {
  sendVerificationEmail,
  generateSecretKey,
};

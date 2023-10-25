const nodemailer = require("nodemailer");

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
    text: `Please click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  sendVerificationEmail,
};

"use server"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.CONFIRMATION_EMAIL,
    pass: process.env.CONFIRMATION_EMAIL_PWD,
  },
});

const validationEmailTemplate = (email: string, token: string) => {
  return `<div style="margin: 10px;">
  <h2>Validate Your Email</h2><p>Your email was used to sign up for an account on <b>Mind Anchor</b>. 
  To validate your account and gain access to the app click the button below.</p> 
<a href="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/validate-email?token=${token}&email=${email}" 
style="padding: 10px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">Validate Email</a>
  </div>
`;
};

export const sendVerificationEmail = async (token: string, email: string) => {
  const info = await transporter.sendMail({
    from: '"Daniil Rayu @ Mind Anchor" <dan.rayu@gmail.com>', // sender address
    to: email,
    subject: "Validate Your email", // Subject line
    html: validationEmailTemplate(email, token), // html body
  });
};

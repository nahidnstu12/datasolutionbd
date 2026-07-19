import nodemailer from "nodemailer";

const password = (process.env.MAIL_PASSWORD || "").replace(/^["']|["']$/g, "");
const port = parseInt(process.env.MAIL_PORT || "587", 10);
const isSecurePort = port === 465;

const smtpConfig = {
  host: process.env.MAIL_HOST || "smtp.hostinger.com",
  port,
  secure: isSecurePort,
  requireTLS: !isSecurePort,
  auth: {
    user: process.env.MAIL_USERNAME || "",
    pass: password,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: {
    rejectUnauthorized: false,
  },
};

export const transporter = nodemailer.createTransport(smtpConfig);

export function getMailFrom() {
  const name = process.env.MAIL_FROM_NAME || "Data Solution BD Contact";
  const address =
    process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME || "";
  return `"${name}" <${address}>`;
}

export function getContactRecipient() {
  return process.env.CONTACT_TO_EMAIL || "nahid.dev19@gmail.com";
}

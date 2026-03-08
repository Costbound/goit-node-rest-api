import nodemailer from "nodemailer";
import createHttpError from "http-errors";
import config from "../config.js";

const { host, port, user, password } = config.smtpServer;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass: password,
  },
});

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (err) {
    console.log(err.message);
    throw createHttpError(
      500,
      "Failed to send the email, please try again later.",
    );
  }
};

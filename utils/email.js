/* ------------------------------- */
/* Nodemailer Configuration */
/* ------------------------------- */
/* The provided code sets up Nodemailer for sending emails using the configured transporter. It includes functions for sending OTP emails, verifying emails, and sending reset password emails. */

import nodemailer from 'nodemailer';
import { createResetPasswordToken } from './generateToken.js';
import Token from '../models/tokenModel.js';
import crypto from 'crypto';

/* Create a Nodemailer transporter */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

/* Generate a random OTP (6 digits) */
const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

/* Send an OTP email */
export const sendOTP = async (email) => {
  try {
    const OTP = generateOTP();

    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'OTP for login',
      html: `<p>Your OTP is <b>${OTP}</b></p>`,
    });

    return OTP;
  } catch (err) {
    throw new Error(err);
  }
};

/* Send a verified email link */
export const sendVerifiedEmail = async (email) => {
  try {
    const token = crypto.randomBytes(64).toString('hex');

    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Verified Email',
      html: `<p>Click <a href="${process.env.NODE_URL}/api/auth/verified-email/${token}">here</a> to verify your email</p>`,
    });

    Token.create({ email, token });
  } catch (err) {
    throw new Error(err);
  }
};

/* Send a reset password email */
export const resetPasswordEmail = async (email) => {
  try {
    const resetPasswordToken = createResetPasswordToken({ email });

    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Link for reset password',
      html: `<p>Click <a href="${process.env.NODE_URL}/api/auth/reset-password/${resetPasswordToken}">here</a> to reset your password</p>`,
    });

    Token.create({ email, token: resetPasswordToken });
  } catch (err) {
    throw new Error(err);
  }
};

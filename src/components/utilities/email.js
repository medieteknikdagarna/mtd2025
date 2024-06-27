import * as fs from 'node:fs';
import nodemailer from "nodemailer";

// Create a SMTP transporter object 
export const transporter = nodemailer.createTransport({
  host: "smtp.websupport.se",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
});


// process.env.NEXT_PUBLIC_EMAIL_USER
// vercek variable


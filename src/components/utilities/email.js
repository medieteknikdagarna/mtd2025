import * as fs from 'node:fs';
import nodemailer from "nodemailer";

// Create a SMTP transporter object 
export const transporter = nodemailer.createTransport({
  host: "smtp.websupport.se",
  port: 465,
  secure: true,
  auth: {
    user: "info@medieteknikdagarna.se",
    pass: "g/fx!qK>uz1JBTI/e`b(",
  },
});



// this file might be deprecated
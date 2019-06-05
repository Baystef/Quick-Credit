import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import logger from './debugger';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function sendMail(data) {
  const msg = {
    to: data.email,
    from: { email: process.env.SENDER_EMAIL, name: 'Quick Credit' },
    subject: data.subject,
    html: data.html,
  };

  sgMail.send(msg, (error) => {
    if (error) {
      logger(error);
    } else {
      logger('Message Sent Successfully!');
    }
  });
}

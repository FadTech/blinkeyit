import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.RESEND_API_KEY) {
  console.log("RESEND_API_KEY is not defined in the environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("resend object:", resend);
const sendEmail = async ({sendTo, subject, html}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Blinkeyit <onboarding@resend.dev>',
      to: sendTo,
      subject: subject,
      html: html
    });

    console.log("Email send response:", data);

    if (error) {
      return console.error({error});
    }

    return data;

  } catch (error) {
    console.log({error});
  }
};

export default sendEmail;
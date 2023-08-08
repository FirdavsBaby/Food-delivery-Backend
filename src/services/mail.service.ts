import nodemailer from 'nodemailer'
import config from '../config/cfg.js';

const sendMail = (mail: string, tag: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.email,
            pass: config.pass
        }
    });
    const mailOptions = {
        from: "Blow site",
        to: mail,
        port: 465,
        secure: true,
        subject: subject,
        html: tag,
        text: "Secure confirm you email"
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log("Error:", err);
        } else {
            console.log("Message sent successfully");
        }
    });
}

export default sendMail



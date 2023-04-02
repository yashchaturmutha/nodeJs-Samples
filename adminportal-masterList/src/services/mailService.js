const nodemailer = require('nodemailer');
const new_line = '\n\xA0';
const mailCred = require("../../config/mailcred");
const { subject } = require("../../config/app")

let mailService = async (identity, message) => {
    return new Promise((resolve, reject) => {
        let mailTransporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: mailCred.user,
                pass: mailCred.password
            }
        });
        let mailDetails = {
            from: mailCred.user,
            to: [identity],
            subject: subject,
            text: message,

            attachments: [
                {
                    filename: "Timeline_Enterprise_Solution.pdf",
                    path: 'C:\Users//Raunak_Kumar//Downloads//Timeline_Enterprise_Solution.pdf'
                }
            ]
        };

        mailTransporter.sendMail(mailDetails, async (err, data) => {
            if (err) {
                console.log('Error Occurs', err);
                reject(err);
            } else {
                console.log(data.accepted);
                console.log('Email sent successfully');
                resolve(data.accepted)
            }
        });
    })
}

module.exports = {
    mailService,
};
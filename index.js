'use strict';
const nodemailer = require('nodemailer');
const aguid = require('aguid');
const fs = require('fs');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'mail.teamsvoice.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {rejectUnauthorized: false},
    auth: {
        user: 'postmaster@teamsvoice.com', // generated ethereal user
        pass: 'Aa123456'  // generated ethereal password
    }
});

let contacts = fs.readFileSync('./contacts.json').toString();
const template = fs.readFileSync('./index.html').toString();

contacts = JSON.parse(contacts);
contacts.forEach(function (contact, key) {
    (function () {
        setTimeout(function () {
            console.log('-----------');
            console.log('Sent');
            console.log(2000 * key);
            console.log(contact.email);
            sendEmail(contact);
            console.log('-----------');
        }, 2000 * key);
    }())
});


function sendEmail(contact) {
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Teamsvoice News <postmaster@teamsvoice.com>', // sender address
        to: contact.name + ' <' + contact.email + '>', // list of receivers
        subject: 'Is this the new bitcoin - Verification Required', // Subject line
        html: template,
        headers: {
            'From': 'postmaster@teamsvoice.com',
            'Message-ID': aguid((new Date()).getTime() + '.' + Math.round(Math.random() * 100)) + '@mail.teamsvoice.com',
            'Reply-To': 'postmaster@teamsvoice.com',
            'MIME-Version': '1.0'
        },
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}


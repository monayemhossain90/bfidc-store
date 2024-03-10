var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {
    
    //transporter
    let transporter = await nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 587,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    let mailOptions = {
        from: 'Inventory MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility

const nodemailer = require('nodemailer');

module.exports.sendMail = (email,subject,html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anhpd.ptit@gmail.com',
          pass: 'mcrw uxej xppk vzqw'
        }
      });
      
      const mailOptions = {
        from: 'anhpd.ptit@gmail.com',
        to: email ,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}
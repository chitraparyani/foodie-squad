// exports.sendMail = function (user) {
//     sendMail(user).catch(console.error);
//     // return promise;
// };

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

exports.sendMail = (user) => {

    return new Promise((resolve, response)=>{
        console.log(user);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'foodiesquads@gmail.com',
                pass: 'Foodie@123'
            }
        });
        const mailOptions = {
            from: 'foodiesquads@gmail.com',
            to: 'foodiesquads@gmail.com',
            subject: `Message from ${user.name}`,
            html: `<h3>Message from ${user.name}</h3><p>${user.message}</p><p>Contact me at ${user.email}</p>`
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                reject("Mail not sent");
                console.log(err);
            }else{
                console.log(info.messageId);
                console.log(nodemailer.getTestMessageUrl(info));
                resolve("Mail sent succesfully");
            }
        });
    })
    
}
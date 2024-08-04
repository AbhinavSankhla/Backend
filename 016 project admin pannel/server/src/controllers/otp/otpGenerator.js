
const nodemailer = require('nodemailer');  //it create transport in which we tell which service we are using
const otpSave = require('../../support/otpdata/otpMap');
require('dotenv').config();
// const otpSave = require('./../../support/otpdata/otpMap');

const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_APP_PASSWORD
    }
});

const otpGenrator = async(req,res) =>{
    try{
        const {email} = req.body;
        const otp = Math.floor(Math.random() * 1000000);

        // console.log(otp, email);

        otpSave.set(email, otp);    //here email= key, otp= value.
        

        const options = {
            from: process.env.ADMIN_MAIL,
            to: email,
            subject: 'OTP for password reset',
            // text: `your otp is ${otp}`
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
        }
        .container{
            max-width: 800px;
            margin: auto;
          
            padding: 20px;
            color: white;
        }
        span{
            font-weight: 800;
            font-size: 22px;
            font-style: italic;
        }

        img {
            width: 400px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Vadapav Center</h1>
        <p>
            Thank you so Anda
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat dolores quisquam sapiente cupiditate. Magni, temporibus quia ipsam distinctio quod, quae labore quam reiciendis vel omnis repellendus natus architecto error autem.
        </p>
        <p></p>
        <p>
            Your one time password is <span>${otp}</span>
        </p>
        <p></p> 
        <p>
            Don't share your otp with Krinjal :)
        </p>
  
    </div>
</body>
</html>`
        }

              // <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg" alt="">

        //transporter contains object + callback function.
        transporter.sendMail(options, (error, success)=>{
            if(error) return res.status(501).json({message : 'something went wrong'});
            
            console.log(success)
            res.status(200).json({message : 'otp sent to your mail'});
        });  

        // console.log(otpSave.get(email));
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'internal server error'});
    }
};

module.exports = otpGenrator;
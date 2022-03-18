const router = require("express").Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

// get contact/
router.get("/", (req, res) => {
  res.send("contacted");
});

// router.post("/", (req, res) => {
//   let { name, email, message } = req.body;

//   // smtp is a protocol for sending messages, every email providers support this protocol
//   let smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     //  the port of connect
//     port: 465,
//     secure: false,
//     auth: {
//       user: "onlinesapak@gmail.com",
//       pass: "1853pr100",
//     },
//   });

//   let mailOptions = {
//     from: email,
//     to: "onlinesapak@gmail.com",
//     subject: `Message from ${name}`,
//     html: `
//            <h3> Informations </h3>
//            <ul>
//               <li> Name: ${name} </li>
//               <li> Email: ${email} </li>
//            </ul>
//            <h3> Message </h3>
//            <p> ${message} </p>

//       `,
//   };

//   smtpTransport.sendMail(mailOptions, (err, response) => {
//     try {
//       if (err) {
//         return res.status(400).json({ msg: "contactt error", err });
//       } else {
//         return res.status(200).json({ msg: `Message was succesfully sent` });
//       }
//     } catch (err) {
//       res.status(500).json({ msg: "contact error", err });
//     }
//   });
// });

router.post("/", (req, res) => {
  // console.log(req.body);
  //Formating content to be send
  var emailcontent = `<h3> Contact Details</h3>
                     <ul>
                      <li>name: ${req.body.name}</li>
                      <li>email : ${req.body.email}</li>
                     </ul>
                     <h2>Message</h2>
                      <p>message: ${req.body.message}</p>
                          `;
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "nurmuhammet.muradov0309@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: "nurmuhammet.muradov0309@gmail.com",
    to: "nurmuhammet.muradov0309@gmail.com",
    subject: "New Message",
    text: req.body.message,
    html: emailcontent,
  };
  //Sending email using transporter function..
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("Email sent: " + info.response);
      return res.status(200).json({ msg: `Ugradyldy` });
    }
  });
});

module.exports = router;

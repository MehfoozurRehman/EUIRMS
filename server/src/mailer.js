const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

async function mailer(from, to, template, data, user, pass) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "views"),
      extName: ".handlebars",
    })
  );

  let mailOptions = {
    from: from,
    to: to,
    subject: data.subject,
    template: template,
    context: data,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log({ message: error });
    } else {
      console.log({
        message: "Email sent: " + info.response,
      });
    }
  });
}

module.exports = mailer;

const nodemailer = require('nodemailer');
const { resolve } = require('path');
const exphbs = require('express-handlebars');
const nodemailerehbs = require('nodemailer-express-handlebars');
const mailCfg = require('../config/mail');

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailCfg;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerehbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailCfg.default,
      ...message,
    });
  }
}

module.exports = new Mail();

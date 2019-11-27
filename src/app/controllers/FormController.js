/* eslint-disable camelcase */
const Form = require('../models/Form')
const Yup = require('yup');
const Mail = require('../../lib/Mail')

class FormController {
  async index (req, res) {
    const forms = await Form.find().sort( { createdAt: 1 });

    return res.json(forms);
  }

  async store(req, res) {
    const phoneRegex = /^[0-9]{10,11}$/;

    const schema = Yup.object().shape({
      identification: Yup.string().required(),
      name: Yup.string(),
      city: Yup.string(),
      phone: Yup.string().matches(phoneRegex, 'Phone is not valid'),
      email: Yup.string().email().required(),
      students_amount: Yup.number().positive(),
      course_period: Yup.number().min(1).max(60),
    })

    const schemaValidation = await schema.isValid(req.body);

    if (!schemaValidation) {
      return res.status(401).json({ error: 'Data validation errors' });
    }

    const { 
      identification, 
      name, 
      city, 
      phone, 
      email, 
      students_amount, 
      course_period 
    } = req.body;

    const form = await Form.create(req.body);

    Mail.sendMail({
      to: `${identification} <${email}>`,
      cc: `comercial-hackathon-rsxp@gmail.com`,
      subject: `Novo formulário de cadastro`,
      template: 'auto-reply',
      context: {
        identification,
        name,
        email,
        city: city !== undefined ? city : null,
        phone: phone !== undefined ? phone : null,
        students_amount: students_amount !== undefined ? students_amount : null,
        course_period: course_period !== undefined ? course_period : null
      },
    });

    return res.json(form);
  }
}

module.exports = new FormController();

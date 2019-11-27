const User = require('../models/User')

class UserController {
  async index (req, res) {
    const users = await User.find();

    return res.json(users);
  }

  async store(req, res) {
    const user = await User.create(req.body)

    return res.json(user);
  }

  async update(req, res) {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, req.body, { new: true })

    return res.json(user);
  }
}

module.exports = new UserController();

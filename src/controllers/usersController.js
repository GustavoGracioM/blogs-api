const usersService = require('../services/usersService');

const usersController = {
  async login(req, res) {
    const { email, password } = req.body;
    await usersService.validateInfos(email, password);
    const token = await usersService.login(email, password);
    res.status(200).json({ token });
  },
};

module.exports = usersController;
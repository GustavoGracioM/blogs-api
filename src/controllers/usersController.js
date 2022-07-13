const usersService = require('../services/usersService');

const usersController = {
  async login(req, res) {
    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    req.headers.authorization = token;
    res.status(200).json({ token });
  },
  async add(req, res) {
    const { displayName, email, password, image } = req.body;
    await usersService.checkIsNotExistUser(email);
    const token = await usersService.add(displayName, email, password, image);
    res.status(201).json({ token });
  },
};

module.exports = usersController;
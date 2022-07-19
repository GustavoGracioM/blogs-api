require('dotenv').config();
const jwt = require('jsonwebtoken');
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
  async get(req, res) {
    const users = await usersService.get();
    res.status(200).json(users);
  },
  async getById(req, res) {
    const { id } = req.params;
    const user = await usersService.getById(id);
    res.status(200).json(user);
  },
  async delete(req, res) {
    const token = req.headers.authorization;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    await usersService.delete(id);
    res.status(204).end();
  },
};

module.exports = usersController;
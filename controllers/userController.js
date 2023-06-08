const userService = require("../services/userService");

class UserController {
  async crateUser(req, res) {
    try {
      const result = await userService.createNewUser(req.body);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await userService.getAll();
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async getUsersWithParams(req, res) {
    try {
      const result = await userService.getAllWithParams(req.query);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.getById(id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async getUserByToken(req, res) {
    try {
      const { token } = req.query;
      const result = await userService.getByToken(token);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async updateUserByID(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await userService.updateByID(id, data);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
  async getSuperAdminUsers(req, res) {
    console.log(req);
    try {
      const result = await userService.getAllSuperAdmin();
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async deleteUserByID(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.deleteByID(id);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async loginUser(req, res) {
    try {
      const result = await userService.login(req.body);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}

module.exports = new UserController();

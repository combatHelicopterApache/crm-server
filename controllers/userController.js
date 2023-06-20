const userService = require("../services/userService");

class UserController {
  async crateUser(req, res) {
    try {
      const result = await userService.createNewUser(req.body);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await userService.getAll(req.company_id);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getUsersList(req, res) {
    try {
      const result = await userService.getList();
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getUsersWithParams(req, res) {
    try {
      const result = await userService.getAllWithParams(req);
      return res.status(result.code).send(result);
    } catch (err) {}
    return res.status(500).json({ message: err.message });
  }

  async getUserById(req, res) {
    try {
      const result = await userService.getById(req.params.id);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getUserByToken(req, res) {
    try {
      const { id } = req.user;
      const result = await userService.getByToken(id);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateUserByID(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await userService.updateByID(id, data);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getSuperAdminUsers(req, res) {
    try {
      const result = await userService.getAllSuperAdmin();
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUserByID(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.deleteByID(id);
      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async loginUser(req, res) {
    try {
      const result = await userService.login(req.body);

      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async loginToCompany(req, res) {
    try {
      const result = await userService.loginToCompany(req);

      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async backToAdmin(req, res) {
    try {
      const result = await userService.backToAdmin(req);

      return res.status(result.code).send(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();

const User = require("../models/userModel");
const customMessages = require("../common/messages");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { initialUser, UserRole, UserStatus } = require("../const/user");
const validationService = require("./validationService");

class UserService {
  async createNewUser(data, Model) {
    const {
      full_name,
      title,
      phone,
      email,
      password,
      role,
      role_id,
      group,
      is_admin,
      parent_id,
      child_id,
      company_id,
    } = data;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return { status: false, message: customMessages.user.failed.exists };
    }

    const user = await new User({
      full_name,
      title,
      phone,
      email,
      password,
      role,
      role_id,
      group,
      is_admin,
      parent_id,
      child_id,
      company_id,
    });

    const createdUser = await user.save();

    const userData = await this.prepareUserData(createdUser);
    if (createdUser) {
      return {
        status: true,
        message: customMessages.user.success.add,
        user: userData,
      };
    } else {
      return { status: false, message: customMessages.user.failed.add };
    }
  }

  async getAll() {
    const users = await User.find().sort({ created_at: 1 });

    const userData = users.reduce((acc, item) => {
      acc.push({
        id: item?._id,
        full_name: item?.full_name,
        title: item?.title,
        phone: item?.phone,
        email: item?.email,
        role: item?.role,
        role_id: item?.role_id,
        group: item?.group,
        is_admin: item?.is_admin,
        parent_id: item?.parent_id,
        child_id: item?.child_id,
        company_id: item?.company_id,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      });

      return acc;
    }, []);
    if (users) {
      return { status: true, data: userData };
    } else {
      return {
        status: false,
        message: customMessages.user.common.search.failed,
      };
    }
  }
  async getAllSuperAdmin() {
    const users = await User.find({ role_id: 1 });

    const userData = users.reduce((acc, item) => {
      acc.push({
        id: item?._id,
        full_name: item?.full_name,
        title: item?.title,
        phone: item?.phone,
        email: item?.email,
        role: item?.role,
        role_id: item?.role_id,
        group: item?.group,
        is_admin: item?.is_admin,
        parent_id: item?.parent_id,
        child_id: item?.child_id,
        company_id: item?.company_id,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      });

      return acc;
    }, []);

    if (users) {
      return { status: true, data: userData };
    } else {
      return {
        status: false,
        message: customMessages.user.common.search.failed,
      };
    }
  }
  async getAllWithParams(data) {
    const {
      sort,
      order,
      page,
      per_page,
      full_name,
      email,
      phone,
      title,
      role,
      group,
      company_name,
    } = data;

    const limit = per_page || 25;
    const skip = (page - 1) * per_page;

    const sortOptions = {};
    if (sort && order) {
      sortOptions[sort] = order === "desc" ? -1 : 1;
    }

    // filters field
    const filterOptions = {};

    full_name
      ? (filterOptions.full_name = { $regex: full_name, $options: "i" })
      : null;
    email ? (filterOptions.email = { $regex: email, $options: "i" }) : null;
    phone ? (filterOptions.phone = { $regex: phone, $options: "i" }) : null;
    title ? (filterOptions.title = { $regex: title, $options: "i" }) : null;
    role ? (filterOptions.role = { $regex: role, $options: "i" }) : null;
    group ? (filterOptions.group = { $regex: group, $options: "i" }) : null;
    company_name
      ? (filterOptions.company_name = { $regex: company_name, $options: "i" })
      : null;

    const total = await User.countDocuments();

    const users = await User.find(filterOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    if (users) {
      return {
        status: true,
        data: users,
        meta: {
          page,
          per_page,
          total,
        },
      };
    } else {
      return {
        status: false,
        message: customMessages.user.common.search.failed,
      };
    }
  }

  async getById(id) {
    if (!(await validationService.validateMongoId(id)))
      return { status: false, message: customMessages.id.error, id: id };

    const foundUser = await User.findById({ _id: id });
    const userData = await this.prepareUserData(foundUser);

    if (foundUser) {
      return { status: true, data: userData };
    } else {
      return {
        status: false,
        message: customMessages.user.common.search.failed,
        id: id,
      };
    }
  }

  async getByToken(token) {
    const userId = jwt.verify(token, proccess.env.JWT_SECRET).id;

    const user = await this.getById(userId);

    if (userId) {
      return { user };
    } else {
      return {
        status: false,
        message: customMessages.user.common.search.failed,
      };
    }
  }

  async updateByID(id, data) {
    if (!(await validationService.validateMongoId(id)))
      return { status: false, message: customMessages.id.error, id: id };
    const filter = { _id: id };

    const resUpdate = await User.findByIdAndUpdate(filter, data, {
      new: true,
    });

    const userData = await this.prepareUserData(resUpdate);

    if (resUpdate) {
      return {
        status: true,
        message: customMessages.user.success.update,
        data: userData,
      };
    } else {
      return { status: false, message: customMessages.user.failed.update };
    }
  }

  async deleteByID(id) {
    if (!(await validationService.validateMongoId(id)))
      return { status: false, message: customMessages.id.error, id: id };

    const resDelete = await User.findByIdAndDelete(id);
    const userData = await this.prepareUserData(resDelete);
    if (resDelete) {
      return {
        status: true,
        code: 200,
        message: customMessages.user.success.delete,
        data: userData,
      };
    } else {
      return { status: false, message: customMessages.user.failed.delete };
    }
  }

  async prepareUserData(data) {
    const userData = [data].reduce((acc, item) => {
      (acc.id = item?._id),
        (acc.full_name = item?.full_name),
        (acc.title = item?.title),
        (acc.phone = item?.phone),
        (acc.email = item?.email),
        (acc.role = item?.role),
        (acc.role_id = item?.role_id),
        (acc.group = item?.group),
        (acc.is_admin = item?.is_admin),
        (acc.parent_id = item?.parent_id),
        (acc.child_id = item?.child_id),
        (acc.company_id = item?.company_id),
        (acc.created_at = item?.created_at),
        (acc.updated_at = item?.updated_at);

      return acc;
    }, {});

    return userData;
  }

  async login(data) {
    const user = await User.findOne({
      email: data.email,
      password: data.password,
    });
    const userData = await this.prepareUserData(user);

    const tokenData = {
      id: userData.id,
      full_name: userData.full_name,
      role: userData.role,
      email: userData.email,
    };

    const token = jwt.sign(tokenData, proccess.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    if (!user) {
      return { status: false, message: customMessages.login.failed.match };
    } else {
      return {
        status: true,
        message: customMessages.login.success,
        token: token,
        data: userData,
      };
    }
  }
  async createOwnerUserForNewCompany(data) {
    const { admin_name, admin_phone, admin_email, address } = data;

    const candidate = await User.findOne({ email: admin_email });

    if (candidate) {
      return { status: false };
    }

    const user = new User({
      ...initialUser,
      full_name: admin_name,
      phone: admin_phone,
      email: admin_email,
      password: "Owner12345",
      role_name: "Owner",
      role_id: UserRole.OWNER,
      is_admin: true,
      status: UserStatus.ACTIVE,
      address: address,
      title: "Owner",
    });

    const createdUser = await user.save();
    const userData = await this.prepareUserData(createdUser);
    if (createdUser) {
      return {
        status: true,
        message: customMessages.user.success.add,
        user: userData,
      };
    } else {
      return { status: false, message: customMessages.user.failed.add };
    }
  }
}

module.exports = new UserService();

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {initialUser, UserRole, UserStatus} = require("../const/user");
const validationService = require("./validationService");
const bcrypt = require("bcrypt");
const UserDTO = require("../dtos/userDto");
const Response = require("../common/responseMessages");

class UserService {
    async createNewUser(data) {
        try {
            const {
                full_name,
                title,
                phone,
                email,
                password,
                is_admin,
                active,
                role_id,
                role_name,
                company_id,
                company_name,
                background_color,
                notes,
                user_identifier,
                permissions,
                last_login,
                brands,
                desk_id,
                desk_name,
                manager_id,
                manager_name,
                owner_id,
                owner_name
            } = data;

            const candidate = await User.findOne({email});

            if (candidate) {
                return {
                    status: false,
                    code: 422,
                    message: Response.exists('user', 'email'),
                };
            }

            const saltPass = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, saltPass);

            const user = await new User({
                full_name,
                title,
                phone,
                email,
                password: hashedPass,
                is_admin,
                active,
                role_id,
                role_name,
                company_id,
                company_name,
                background_color,
                notes,
                user_identifier,
                permissions,
                last_login,
                brands,
                desk_id,
                desk_name,
                manager_id,
                manager_name,
                owner_id,
                owner_name
            });

            const createdUser = await user.save();

            createdUser.pivot = {
                company_id,
                role_id,
                desk_id,
                manager_id,
            };

            if (createdUser) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post('user', true),
                    user: await UserDTO.userObject(createdUser),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post('user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getAll(company_id) {
        try {
            const users = await User.find({company_id: company_id}).sort({
                created_at: 1,
            });

            if (users) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('users', true),
                    data: await UserDTO.userArray(users),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search('user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getList(company_id) {
        try {
            const users = await User.find({company_id: company_id}, "id, full_name").sort({
                created_at: 1,
            });

            if (users) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('users', true),
                    data: await UserDTO.userArray(users),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search('user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getAllSuperAdmin() {
        try {
            const users = await User.find({role_id: 1});

            if (users) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('admin users', true),
                    data: await UserDTO.userArray(users),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search('admin users', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getAllWithParams(data) {
        try {
            const {
                sort,
                order,
                page,
                per_page,
                // filter fields
                full_name,
                email,
                phone,
                title,
                role_id,
                role_name,
                company_name,
                user_identifier,
                last_login,
                desk_id,
                desk_name,
                manager_id,
                manager_name,
            } = data.query;

            const limit = per_page || 25;
            const skip = (page - 1) * per_page;

            const sortOptions = {};
            if (sort && order) {
                sortOptions[sort] = order === "desc" ? -1 : 1;
            }

            const company_id = data.company_id;

            // filters field
            const filterOptions = {};
            // default filter
            company_id ? (filterOptions.company_id = parseInt(company_id)) : null;

            full_name
                ? (filterOptions.full_name = {$regex: full_name, $options: "i"})
                : null;
            email ? (filterOptions.email = {$regex: email, $options: "i"}) : null;
            phone ? (filterOptions.phone = {$regex: phone, $options: "i"}) : null;
            title ? (filterOptions.title = {$regex: title, $options: "i"}) : null;
            company_name
                ? (filterOptions.company_name = {$regex: company_name, $options: "i"})
                : null;
            role_name
                ? (filterOptions.role_name = {$regex: role_name, $options: "i"})
                : null;
            user_identifier
                ? (filterOptions.user_identifier = {
                    $regex: user_identifier,
                    $options: "i",
                })
                : null;
            last_login
                ? (filterOptions.last_login = {$regex: last_login, $options: "i"})
                : null;
            desk_name
                ? (filterOptions.desk_name = {$regex: desk_name, $options: "i"})
                : null;
            manager_name
                ? (filterOptions.manager_name = {$regex: manager_name, $options: "i"})
                : null;

            role_id ? (filterOptions.role_id = parseInt(role_id)) : null;
            desk_id ? (filterOptions.desk_id = parseInt(desk_id)) : null;
            manager_id ? (filterOptions.manager_id = parseInt(manager_id)) : null;

            const total = await User.countDocuments();

            const users = await User.find(filterOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            if (users) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('users', true),
                    data: await UserDTO.userArray(users),
                    meta: {
                        page,
                        per_page,
                        total,
                    },
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search('users', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getById(id) {
        try {
            if (!(await validationService.validateMongoId(id))) {
                return {
                    status: false,
                    code: 400,
                    message: Response.errors('id'),
                    id: id,
                };
            }

            const user = await User.findById({_id: id});

            if (user) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('user', true),
                    data: await UserDTO.userObject(user),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search('user', false),
                    id: id,
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getByToken(id) {
        try {
            const foundUser = await User.findOne({_id: id});
            const userData = await UserDTO.userObject(foundUser);

            const tokenData = {
                id: userData.id.toString(),
                full_name: userData.full_name,
                role_id: userData.role_id,
                role_name: userData.role_name,
                email: userData.email,
                company_id: userData.company_id,
            };

            const newToken = jwt.sign(tokenData, process.env.JWT_SECRET, {
                expiresIn: "12h",
            });

            if (foundUser) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get('user', true),
                    data: userData,
                    token: newToken,
                };
            } else {
                return {
                    status: false,
                    code: 401,
                    message: Response.search('user', true),
                };
            }
        } catch (e) {
            return {
                code: 401,
                error: e.message,
            };
        }
    }

    async updateByID(id, data) {
        try {
            if (!(await validationService.validateMongoId(id))) {
                return {
                    status: false,
                    code: 400,
                    message: Response.errors('id'),
                    id: id,
                };
            }
            const filter = {_id: id};

            const updated = await User.findByIdAndUpdate(filter, data, {
                new: true,
            });

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update('user', true),
                    data: await UserDTO.userObject(updated),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update('user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async deleteByID(id) {
        try {
            if (!(await validationService.validateMongoId(id))) {
                return {
                    status: false,
                    code: 400,
                    message: Response.errors('id'),
                    id: id,
                };
            }
            const deleted = await User.findByIdAndDelete(id);

            if (deleted) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete('user', true),
                    data: await UserDTO.userObject(deleted),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.delete('user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async login(data) {
        try {
            const user = await User.findOne({
                email: data.email,
            }).lean();

            if (!user) {
                return {
                    status: false,
                    code: 400,
                    message: Response.login('failed_match'),
                };
            }

            const comparedPassword = await bcrypt.compare(
                data.password,
                user.password
            );

            if (!comparedPassword) {
                return {
                    status: false,
                    code: 400,
                    message: Response.login('failed_match'),
                };
            }

            const userData = await UserDTO.userObject(user);

            const tokenData = {
                id: userData?.id.toString(),
                full_name: userData.full_name,
                role_id: userData.role_id,
                role_name: userData.role_name,
                email: userData.email,
                company_id: userData.company_id,
            };

            const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
                expiresIn: "12h",
            });

            await User.findByIdAndUpdate(userData.id, {last_login: new Date()});

            return {
                status: true,
                code: 200,
                message: Response.login('success'),
                token: token,
                data: userData,
            };
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async createOwnerUserForNewCompany(data) {
        try {
            const {
                admin_name,
                admin_phone,
                admin_email,
                address,
                company_id,
                company_name,
            } = data;

            const candidate = await User.findOne({email: admin_email});

            if (candidate) {
                return {
                    status: false,
                    code: 400,
                    message: Response.exists('Admin user', 'email'),
                };
            }

            const defaultPassword = "Owner12345";
            const saltRounds = parseInt(process.env.BCRYPT_ROUNDS);
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(defaultPassword, salt);

            const user = new User({
                ...initialUser,
                full_name: admin_name,
                phone: admin_phone,
                email: admin_email,
                password: hashedPassword,
                role_name: "Owner",
                role_id: UserRole.OWNER,
                is_admin: false,
                status: UserStatus.ACTIVE,
                address: address,
                title: "Owner",
                company_id,
                company_name,
            });


            const createdUser = await user.save();

            if (createdUser) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post('admin user', true),
                    user: await UserDTO.userObject(createdUser),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post('admin user', false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }
}

module.exports = new UserService();

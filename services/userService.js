const User = require("../models/userModel");
const customMessages = require("../common/messages");
const jwt = require("jsonwebtoken");
const {initialUser, UserRole, UserStatus} = require("../const/user");
const validationService = require("./validationService");
const bcrypt = require("bcrypt");

class UserService {
    async createNewUser(data) {
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
            pivot
        } = data;

        const candidate = await User.findOne({email});

        if (candidate) {
            return {status: false, message: customMessages.user.failed.exists};
        }

        const saltPass = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, saltPass)

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
            pivot
        });

        const createdUser = await user.save();

        const userData = this.prepareUserData(createdUser);
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
        const users = await User.find().sort({created_at: 1});

        const userData = this.prepareUserArrayData(users)
        if (users) {
            return {status: true, data: userData};
        } else {
            return {
                status: false,
                message: customMessages.user.common.search.failed,
            };
        }
    }

    async getAllSuperAdmin() {
        const users = await User.find({role_id: 1});

        const userData = this.prepareUserArrayData(users)

        if (users) {
            return {status: true, data: userData};
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
            // filter fields
            full_name,
            email,
            phone,
            title,
            role_id,
            role_name,
            company_id,
            company_name,
            user_identifier,
            last_login,
            desk_id,
            desk_name,
            manager_id,
            manager_name,
        } = data;

        const limit = per_page || 25;
        const skip = (page - 1) * per_page;

        const sortOptions = {};
        if (sort && order) {
            sortOptions[sort] = order === "desc" ? -1 : 1;
        }

        // filters field
        const filterOptions = {};

        full_name ? (filterOptions.full_name                = {$regex: full_name, $options: "i"}) : null;
        email ? (filterOptions.email                        = {$regex: email, $options: "i"}) : null;
        phone ? (filterOptions.phone                        = {$regex: phone, $options: "i"}) : null;
        title ? (filterOptions.title                        = {$regex: title, $options: "i"}) : null;
        company_name ? (filterOptions.company_name          = {$regex: company_name, $options: "i"}) : null;
        role_name ? (filterOptions.role_name                = {$regex: role_name, $options: "i"}) : null;
        user_identifier ? (filterOptions.user_identifier    = {$regex: user_identifier, $options: "i"}) : null;
        last_login ? (filterOptions.last_login              = {$regex: last_login, $options: "i"}) : null;
        desk_name ? (filterOptions.desk_name                = {$regex: desk_name, $options: "i"}) : null;
        manager_name ? (filterOptions.manager_name          = {$regex: manager_name, $options: "i"}) : null;

        role_id ? (filterOptions.role_id = parseInt(role_id)) : null;
        company_id ? (filterOptions.company_id = parseInt(company_id)) : null;
        desk_id ? (filterOptions.desk_id = parseInt(desk_id)) : null;
        manager_id ? (filterOptions.manager_id = parseInt(manager_id)) : null;

        const total = await User.countDocuments();

        const users = await User.find(filterOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const userData = this.prepareUserArrayData(users)
        if (users) {
            return {
                status: true,
                data: userData,
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
            return {status: false, message: customMessages.id.error, id: id};

        const foundUser = await User.findById({_id: id});
        const userData = this.prepareUserData(foundUser);

        if (foundUser) {
            return {status: true, data: userData};
        } else {
            return {
                status: false,
                message: customMessages.user.common.search.failed,
                id: id,
            };
        }
    }

    async getByToken(token) {
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        const foundUser = await User.findById({_id: userId});
        const userData = this.prepareUserData(foundUser);

        if (userId ) {
            return {status: true, data: userData};
        } else {
            return {
                status: false,
                message: customMessages.user.common.search.failed,
            };
        }
    }

    async updateByID(id, data) {
        if (!(await validationService.validateMongoId(id)))
            return {status: false, message: customMessages.id.error, id: id};
        const filter = {_id: id};

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
            return {status: false, message: customMessages.user.failed.update};
        }
    }

    async deleteByID(id) {
        if (!(await validationService.validateMongoId(id)))
            return {status: false, message: customMessages.id.error, id: id};

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
            return {status: false, message: customMessages.user.failed.delete};
        }
    }

    prepareUserData(data) {
        const user = [data].reduce((acc, item) => {
                acc.id = item?._id,
                acc.full_name = item?.full_name,
                acc.title = item?.title,
                acc.phone = item?.phone,
                acc.email = item?.email,
                acc.is_admin = item?.is_admin,
                acc.active = item?.active,
                acc.role_id = item?.role_id,
                acc.role_name = item?.role_name,
                acc.company_id = item?.company_id,
                acc.company_name = item?.company_name,
                acc.notes = item?.notes,
                acc.user_identifier = item?.user_identifier,
                acc.permissions = item?.permissions,
                acc.last_login = item?.last_login,
                acc.desk_id = item?.desk_id,
                acc.desk_name = item?.desk_name,
                acc.manager_id = item?.manager_id,
                acc.manager_name = item?.manager_name,
                acc.brands = item?.brands,
                acc.pivot = item?.pivot
            return acc;
        }, {});

        return user;
    }

    prepareUserArrayData(data) {
        const users = data.reduce((acc, item) => {
            acc.push({
                id: item?._id,
                full_name: item?.full_name,
                title: item?.title,
                phone: item?.phone,
                email: item?.email,
                is_admin: item?.is_admin,
                active: item?.active,
                role_id: item?.role_id,
                role_name: item?.role_name,
                company_id: item?.company_id,
                company_name: item?.company_name,
                notes: item?.notes,
                user_identifier: item?.user_identifier,
                permissions: item?.permissions,
                last_login: item?.last_login,
                brands: item?.brands,
                desk_id: item?.desk_id,
                desk_name: item?.desk_name,
                manager_id: item?.manager_id,
                manager_name: item?.manager_name,
                pivot: item?.pivot,

                created_at: item?.created_at,
                updated_at: item?.updated_at,
            });

            return acc;
        }, []);

        return users;
    }

    async login(data) {
        const user = await User.findOne({
            email: data.email,
        }).lean();

        if (!user) {  return { status: false, message: customMessages.login.failed.match } }

        const comparedPassword = await bcrypt.compare(data.password, user.password)

        if (!comparedPassword) { return { status: false, message: customMessages.login.failed.match } }


        const userData = this.prepareUserData(user);

        const tokenData = {
            id: user._id.toString(),
            full_name: user.full_name,
            role_id: user.role_id,
            role_name: user.role_name,
            email: user.email,
            company_id: user.company_id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });

        await User.findByIdAndUpdate(userData.id, {last_login: new Date()})
        return {
            status: true,
            message: customMessages.login.success,
            token: token,
            data: userData,
        };

    }

    async createOwnerUserForNewCompany(data) {
        const {admin_name, admin_phone, admin_email, address} = data;

        const candidate = await User.findOne({email: admin_email});

        if (candidate) {
            return {status: false, message: customMessages.user.failed.exists};
        }

        const defaultPassword = "Owner12345";

        const user = new User({
            ...initialUser,
            full_name: admin_name,
            phone: admin_phone,
            email: admin_email,
            password: bcrypt.hash(defaultPassword, process.env.BCRYPT_ROUNDS),
            role_name: "Owner",
            role_id: UserRole.OWNER,
            is_admin: false,
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
            return {status: false, message: customMessages.user.failed.add};
        }
    }
}

module.exports = new UserService();

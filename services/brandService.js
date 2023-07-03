const Brand = require("../models/brandModel");
const BrandDTO = require("../dtos/brandDto");
const Response = require("../common/responseMessages");

class BrandService {
    async createNew(data) {
        try {
            const {title, description, site, platform} = data;

            const brand = await new Brand({
                title,
                description,
                site,
                platform,
            });

            const createdBrand = await brand.save();

            if (createdBrand) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("brand", true),
                    data: BrandDTO.brandObject(createdBrand),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("brand", false),
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
            const brands = await Brand.find().sort({created_at: 1});

            if (brands) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("brand", true),
                    data: BrandDTO.brandArray(brands),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("brand", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getList() {
        try {
            const brands = await Brand.find({}, "id, title").sort({created_at: 1});

            if (brands) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("brands", true),
                    data: BrandDTO.brandArray(brands),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("brands", false),
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
            const brand = await Brand.findById({_id: id});
            if (brand) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("brand", true),
                    data: BrandDTO.brandObject(brand),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.get("brand", false),
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

    async updateById(id, data) {
        try {

            const filter = {_id: id};
            const updated = await Brand.findByIdAndUpdate(filter, data, {
                new: true,
            });
            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("brand", true),
                    data: BrandDTO.brandObject(updated),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("brand", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async deleteById(id) {
        try {

            const deleted = await Brand.findByIdAndDelete(id);

            if (deleted) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete("brand", true),
                    data: BrandDTO.brandObject(deleted),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.delete("brand", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async update(req) {
        const brandId = req.params.id;
        const updates = req.body;

        try {
            const brand = await Brand.findById(brandId);

            if (!brand) {
                return {
                    status: false,
                    code: 400,
                    message: Response.errors("id"),
                    id: brandId,
                };
            }

            for (const field in updates) {
                if (field in brand) {
                    brand[field] = updates[field];
                }
            }

            await brand.save();

            return {
                status: true,
                code: 200,
                message: Response.post("brand", true),
                data: [],
            };
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }
}

module.exports = new BrandService();

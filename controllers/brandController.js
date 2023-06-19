const brandService = require("../services/brandService");

class BrandController {
    async createBrand(req, res) {
        try {
            const result = await brandService.createNew(req.body);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getBrandById(req, res) {
        try {
            const result = await brandService.getById(req.params.id);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getAllBrands(req, res) {
        try {
            const result = await brandService.getAll(req.company_id);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getBrandList(req, res) {
        try {
            const result = await brandService.getList();
            return res.status(result.code).send(result);

        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async updateBrandById(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await brandService.updateById(id, data);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async deleteBrandById(req, res) {
        try {
            const result = await brandService.deleteById(req.params.id);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}

module.exports = new BrandController();

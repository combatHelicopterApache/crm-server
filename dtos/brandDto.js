class BrandDTO {
    brandArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                description: item.description,
                company_id: item.company_id,
                active: item.active,
                site: this.siteArray(item.site),
                platform: item.platform,
                created_at: item.created_at,
                updated_at: item.updated_at,
            });
            return acc;
        }, []);
    }

    brandObject(data) {
        return data.reduce((acc, item) => {
            acc.id = item._id;
            acc.title = item.title;
            acc.description = item.description;
            acc.company_id = item.company_id;
            acc.active = item.active;
            acc.site = this.siteArray(item.site);
            acc.platform = item.platform;
            acc.created_at = item.created_at;
            acc.updated_at = item.updated_at;
            return acc;
        }, {});
    }

    siteArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                site_logo: item.site_logo,
                site_name: item.site_name,
                site_domains: item.site_domains
            });
            return acc;
        }, []);
    }

}

module.exports = new BrandDTO();

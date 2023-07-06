class BrandDTO {
    brandArray(data) {

        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                description: item.description,
                company_id: item.company_id,
                active: item.active,
                parent_id: item.parent_id,
                site: this.siteArray(item?.site),
                platform: item.platform,
                created_at: item.created_at,
                updated_at: item.updated_at,
            });
            return acc;
        }, []);
    }

    brandObject(data) {
        return  {
            id: data._id,
            title: data.title,
            description: data.description,
            company_id: data.company_id,
            active: data.active,
            parent_id: data.parent_id,
            site: this.siteArray(data.site),
            platform: data.platform,
            created_at: data.created_at,
            updated_at: data.updated_at
        }
    }

    siteArray(data) {
        if (!data) return
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

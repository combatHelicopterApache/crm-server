
class BrandDTO {
    async brandArray (data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                description: item.description,
                company_id: item.company_id,
                active: item.active,
                site: {
                    site_id: item.site.site_id,
                    site_logo: item.site.site_logo,
                    site_name: item.site.site_name,
                    site_domains: item.site.site_domains,
                },
                platform: {
                    cfd_id: item.platform.cfd_id,
                    cfd_logo: item.platform.cfd_logo,
                    cfd_name: item.platform.cfd_name,
                    cfd_domain: item.platform.cfd_domain,
                },
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
            return acc
        }, [])
    }
    async brandObject (data) {
        return Array(data).reduce((acc, item) => {
                acc.id = item._id,
                acc.title = item.title,
                acc.description = item.description,
                acc.company_id = item.company_id,
                acc.active = item.active,
                acc.site = {
                    site_id: item.site.site_id,
                    site_logo: item.site.site_logo,
                    site_name: item.site.site_name,
                    site_domains: item.site.site_domains,
                },
                acc.platform = {
                    cfd_id: item.platform.cfd_id,
                    cfd_logo: item.platform.cfd_logo,
                    cfd_name: item.platform.cfd_name,
                    cfd_domain: item.platform.cfd_domain,
                },
                acc.created_at = item.created_at,
                acc.updated_at = item.updated_at
            return acc
        }, {})
    }
}

module.exports = new BrandDTO()
class BrandDTO {
  async brandArray(data) {
    return data.reduce((acc, item) => {
      acc.push({
        id: item._id,
        title: item.title,
        description: item.description,
        company_id: item.company_id,
        active: item.active,
        site: item.site,
        platform: item.platform,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
      return acc;
    }, []);
  }
  async brandObject(data) {
    return Array(data).reduce((acc, item) => {
      acc.id = item._id;
      acc.title = item.title;
      acc.description = item.description;
      acc.company_id = item.company_id;
      acc.active = item.active;
      acc.site = item.site;
      acc.platform = item.platform;
      acc.created_at = item.created_at;
      acc.updated_at = item.updated_at;
      return acc;
    }, {});
  }
}

module.exports = new BrandDTO();

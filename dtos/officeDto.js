class OfficeDTO {
  async officeArray(data) {
    return data.reduce((acc, item) => {
      acc.push({
        active: item.active,
        id: item._id,
        title: item.title,
        address: item.address,
        description: item.description,
        company_id: item.company_id,
        time_cards: item.time_cards,
        manager_id: item.manager_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
      return acc;
    }, []);
  }
  async officeObject(data) {
    return Array(data).reduce((acc, item) => {
      (acc.id = item._id),
        (acc.title = item.title),
        (acc.address = item.address),
        (acc.description = item.description),
        (acc.company_id = item.company_id);
      return acc;
    }, {});
  }
}

module.exports = new OfficeDTO();

class Record {
  constructor(...fields) {
    const validFields = fields.filter(
      field =>
        field !== 'constructor' &&
        typeof field === 'string' &&
        field.match(/[a-zA-Z]+/g).length === field.length
    );
    validFields.forEach(field => (this[field] = null));
  }
}

module.exports = fields => () => new Record(fields);

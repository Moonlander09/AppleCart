export default class APIFeatures {
  constructor(query, queryString) {

    this.query = query;
    this.queryString = queryString;
  }

  // ✅ 1. Filter Products Based on Category
  filter() {
    const category = this.queryString.get("category");
    if (category) {
      this.query = this.query.find({ category: category });
    }
    return this;
  }
  // Pagination for the website
  paginate() {
    const page = this.queryString.get('page') * 1 || 1;
    const limit = this.queryString.get('limit') * 1 || 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

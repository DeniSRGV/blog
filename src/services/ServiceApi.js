class ServiceApi {
  url = 'https://kata.academy:8021/api'

  //getting a list of articles
  async getArticles(page = 1) {
    const offset = (page - 1) * 5
    const res = await fetch(`${this.url}/articles?limit=5&offset=${offset}`)
    return res.json()
  }
  async getArticleItem(slug) {
    const res = await fetch(`${this.url}/articles/${slug}`)
    return res.json()
  }
}
export default ServiceApi

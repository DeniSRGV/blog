class ServiceApi {
  URL = 'https://kata.academy:8021/api'

  //getting a list of articles
  async getArticles(page = 1) {
    const offset = (page - 1) * 5
    const res = await fetch(`${this.URL}/articles?limit=5&offset=${offset}`)
    return res.json()
  }
  // get full article
  async getArticleItem(slug) {
    const res = await fetch(`${this.URL}/articles/${slug}`)
    return res.json()
  }
  // Register a new user

  async registerNewUser(data) {
    const res = await fetch(`${this.URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ user: data })
    })
    return res.json()
  }
  // user authorization
  async authUser(data) {
    const res = await fetch(`${this.URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ user: data })
    })
    return res.json()
  }
  // Update current user
  async updateUser(data, token) {
    const res = await fetch(`${this.URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ user: data })
    })
    return res.json()
  }
}
export default ServiceApi

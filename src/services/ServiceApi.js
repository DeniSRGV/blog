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
  // creating a new article
  async createNewArticle(data, token) {
    const res = await fetch(`${this.URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ article: data })
    })
    return res.json()
  }
  //article editing
  async editArticle(data, slug, token) {
    const res = await fetch(`${this.URL}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ article: data })
    })
    return res.json()
  }

  //deleting an article
  async deleteArticle(slug, token) {
    const res = await fetch(`${this.URL}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      }
    })
    return res.json()
  }
  async likeArticle(token, slug) {
    const res = await fetch(`${this.URL}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      }
    })
    return res.json()
  }

  async dislikeArticle(token, slug) {
    const res = await fetch(`${this.URL}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`
      }
    })
    return res.json()
  }
}
export default ServiceApi

let token = null

const blogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 14,
    user: {
      _id: "5b69aa87cdbd893f162bb21c",
      username: "TepTest66",
      name: "Teppo Testaaja"
    }
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 13,
    user: {
      _id: "5b69aa87cdbd893f162bb21c",
      username: "TepTest66",
      name: "Teppo Testaaja"
    }
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: {
      _id: "5b69aa88cdbd893f162bb21d",
      username: "Roro02",
      name: "Roni Ropaaja"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log("current user token: ", token);
}

export default { getAll, blogs, setToken }

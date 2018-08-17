import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'

jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders only login page', () => {
    app.update()
    const loginView = app.find(".loginFormPage-loggedout")
    //console.log(loginView.debug());
    const blogView = app.find(".blogView")
    expect(blogView.length).toBe(0)

  })

  it('renders all blogs', async () => {

    const user = {
      username: 'Roro02',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvcm8wMiIsImlkIjoiNWI2OWFhODhjZGJkODkzZjE2MmJiMjFkIiwiaWF0IjoxNTM0NDE1MzkwfQ.L54wxROWQAZGeqVb0M9kpxUK99w9GZkWnTZfb87Kkzo',
      name: 'Roni Ropaaja'
    }

    //set user in local storage
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    //let's unmount and mount the app again to force token load at componentDidMount
    //Needed to await app to mount and then update (to refresh state)
    app.unmount()
    await app.mount()
    app.update()

    const loginView = app.find(".loginFormPage-loggedout")
    expect(loginView.length).toBe(0)
    const blogComps = app.find(Blog)
    //console.log(blogComps.length)
    expect(blogComps.length).toEqual(blogService.blogs.length)
    //console.log(blogComps.debug());
    // const blogView = app.find(".blogView")
    // console.log(blogView.debug());

  })
})

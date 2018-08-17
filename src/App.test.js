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

  it('renders only login page', () => {
    app.update()
    const loginView = app.find(".loginFormPage-loggedout")
    //console.log(loginView.debug());
    const blogView = app.find(".blogView")
    expect(blogView.length).toBe(0)

  })
})

import React from 'react'
import { shallow } from 'enzyme'

//components
import Blog from './Blog'

describe.only('<Blog />', () => {

  const testiblog = {
    title: 'Test tittle for blog component',
    author: 'Tiny Tester',
    url: "https://testblogurl.com",
    likes: 15,
    user: {username: "Test User"}
  }

  //mockhandlers to satisfy propcheck
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()
  const curUser = "Tero Testaaja"
  let blogTestComponent

  beforeEach(() => {
    blogTestComponent = shallow(<Blog blog={testiblog} delete={mockHandler1} like={mockHandler2} currentUsername={curUser}/>)
  })

  it('url, likes and user is shown after click', () => {

    //pre-click check
    const preClickCheck = blogTestComponent.find('.blogDetailsList')
    expect(preClickCheck.getElement().props.style).toEqual({ display: 'none', listStyleType:"none" })

    //simulate click
    const clickableTitle = blogTestComponent.find('.blogDiv')
    //console.log(clickableTitle.debug());
    clickableTitle.simulate('click')

    //post-click check
    const blogDetailsList = blogTestComponent.find('.blogDetailsList')
    //console.log(blogDetailsList.debug());
    expect(blogDetailsList.getElement().props.style).toEqual({ display: '', listStyleType:"none" })

  })

})

import React from 'react'
import { shallow } from 'enzyme'

//components
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  const testiblog = {
    title: 'Test tittle for blog component',
    author: 'Tiny Tester',
    likes: 10
  }

  const mockHandler = jest.fn()
  let blogTestComponent

  beforeEach(() => {
    blogTestComponent = shallow(<SimpleBlog blog={testiblog} onClick={mockHandler} />)
  })

  it('renders title, author and likes', () => {
    // const testiblog = {
    //   title: 'Test tittle for blog component',
    //   author: 'Tiny Tester',
    //   likes: 10
    // }
    //
    // const blogTestComponent = shallow(<SimpleBlog blog={testiblog} />)

    const titleDiv = blogTestComponent.find('.titleAndAuthorDiv')
    const likes = blogTestComponent.find('.likesDiv')

    expect(titleDiv.text()).toContain(`${testiblog.title} ${testiblog.author}`)
    expect(likes.text()).toContain(`blog has ${testiblog.likes} likes`)
  })

  it('handles two clicks on the like button', () => {

    const likeButton = blogTestComponent.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})

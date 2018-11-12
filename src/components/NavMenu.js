import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = () => {

  const styleOpts = {
    padding: '5px',
    display: 'inline-block',
    borderStyle: 'solid',
    borderWidth: '2px',
  }

  return (
    <div>
      <div style={styleOpts} >
        <Link to="/">Blogs</Link>
      </div >
      <div style={styleOpts} >
        <Link to="/users">Users</Link>
      </div >
    </div>
  )
}

export default NavMenu

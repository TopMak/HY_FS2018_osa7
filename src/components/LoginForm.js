import React from 'react'

const LoginForm = ({submitLogin, credidentials, formInputHandler}) => {

  return (

    <form onSubmit={submitLogin}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={credidentials.username}
          onChange={formInputHandler}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={credidentials.password}
          onChange={formInputHandler}
        />
      </div>
      <button type="submit">Login</button>
    </form>

  )

}


export default LoginForm

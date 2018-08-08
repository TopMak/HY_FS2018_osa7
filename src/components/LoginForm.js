import React from 'react'


const LoginForm = ({submitLogin, credidentials, formInputHandler}) => {

  return (

    <form onSubmit={submitLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          name="username"
          value={credidentials.username}
          onChange={formInputHandler}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          name="password"
          value={credidentials.password}
          onChange={formInputHandler}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>

  )

}


export default LoginForm

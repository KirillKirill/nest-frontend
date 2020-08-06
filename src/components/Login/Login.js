import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import { Link } from "react-router-dom"
import * as S from "../Register/RegisterStyles"

const Login = ({ history, authStore }) => {
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
  })

  const changeInputValue = e => {
    const { name, value } = e.target

    setInputValue({
      ...inputValues,
      [name]: value,
    })

    authStore.error = null
  }

  const handleLoginClick = async e => {
    e.preventDefault()

    const { email, password } = inputValues

    await authStore.login(email, password)
    if (!authStore.isFailure) {
      history.push("/")
    }
  }

  const { email, password } = inputValues

  return (
    <S.Container>
      <S.Form>
        <S.Input
          onChange={changeInputValue}
          value={email}
          name="email"
          placeholder="E-mail"
        />
        <S.Input
          onChange={changeInputValue}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <S.ErrorText>{authStore.error}</S.ErrorText>
        <S.Button
          onClick={handleLoginClick}
          disabled={authStore.error || !email || !password}
        >
          Log In
        </S.Button>
        <S.Text>
          Haven't account? Please, <Link to="/register">Sign up</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  )
}

export default inject(store => ({
  authStore: store.store.authStore,
}))(observer(Login))

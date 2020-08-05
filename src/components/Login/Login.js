import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import { Link } from "react-router-dom"
import * as S from "../Register/RegisterStyles"

const Login = ({ history, authStore }) => {
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const changeInputValue = e => {
    const { name, value } = e.target
    setError("")
    setInputValue({
      ...inputValues,
      [name]: value,
    })
  }

  const handleLoginClick = async e => {
    e.preventDefault()

    const { email, password } = inputValues

    await authStore.login(email, password)
    if (authStore.isFailure) {
      setError(authStore.error)
    } else {
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
        <S.ErrorText>{error}</S.ErrorText>
        <S.Button
          onClick={handleLoginClick}
          disabled={error || !email || !password}
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

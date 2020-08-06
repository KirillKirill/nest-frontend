import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./RegisterStyles"
import { Link } from "react-router-dom"

const Register = ({ history, authStore }) => {
  const [inputValues, setInputValue] = useState({
    username: "",
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

  const handleSignUpClick = async e => {
    e.preventDefault()

    await authStore.register(inputValues)

    if (!authStore.isFailure) {
      history.push("/")
    }
  }

  const getErrorForField = fieldName => {
    if (authStore.error) {
      const errorForField =
        authStore.error.find(err => err.property === fieldName) || null

      return errorForField ? Object.values(errorForField.constraints)[0] : null
    }

    return null
  }

  const { username, email, password } = inputValues
  return (
    <S.Container>
      <S.Form>
        <S.Input
          onChange={changeInputValue}
          value={username}
          name="username"
          placeholder="Username"
        />
        <S.ErrorText>{getErrorForField("username")}</S.ErrorText>
        <S.Input
          onChange={changeInputValue}
          value={email}
          name="email"
          placeholder="E-mail"
        />
        <S.ErrorText>{getErrorForField("email")}</S.ErrorText>
        <S.Input
          onChange={changeInputValue}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <S.ErrorText>{getErrorForField("password")}</S.ErrorText>
        <S.Button
          onClick={handleSignUpClick}
          disabled={
            authStore.error ||
            !Object.values(inputValues).every(val => val.length > 0)
          }
        >
          Sign Up
        </S.Button>
        <S.Text>
          Have account? Just <Link to="/login">Log In</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  )
}

export default inject(store => ({ authStore: store.store.authStore }))(
  observer(Register)
)

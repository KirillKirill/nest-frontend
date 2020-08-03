import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./RegisterStyles"
import { Link } from "react-router-dom"
import NavBar from "../NavBar/NavBar"

const Register = ({ history, authStore }) => {
  const [inputValues, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const changeInputValue = e => {
    const { name, value } = e.target
    setInputValue({
      ...inputValues,
      [name]: value,
    })
    setError("")
  }

  const handleSignUpClick = async e => {
    e.preventDefault()

    await authStore.register(inputValues)

    if (authStore.isFailure) {
      setError(authStore.error)
    } else {
      history.push("/")
    }
  }

  const getErrorForField = fieldName => {
    if (error) {
      const errorForField =
        error.find(err => err.property === fieldName) || null

      return errorForField ? Object.values(errorForField.constraints)[0] : null
    }

    return null
  }

  const { username, email, password } = inputValues
  return (
    <S.Container>
      <NavBar />
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
            error || !Object.values(inputValues).every(val => val.length > 0)
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

export default inject(store => ({ authStore: store.store.AuthStore }))(
  observer(Register)
)

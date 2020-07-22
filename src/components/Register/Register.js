import React, { useState } from "react"
import * as S from "./RegisterStyles"
import { Link } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import { authServices } from "../../services/authService"

const Register = () => {
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
  }

  const handleSignUpClick = e => {
    e.preventDefault()
    authServices.register(inputValues)
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
        <S.Button onClick={handleSignUpClick}>Sign Up</S.Button>
        <S.Text>
          Have account? Just <Link to="/login">Log In</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  )
}

export default Register

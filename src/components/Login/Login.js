import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as S from "./LoginStyles"
import NavBar from "../NavBar/NavBar"
import { authServices } from "../../services/authService"

const Login = props => {
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
  }

  const handleLoginClick = e => {
    e.preventDefault()
    const { email, password } = inputValues
    authServices
      .login(email, password)
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("token", res.token)
      })
      .then(() => props.history.push("/"))
  }

  const { email, password } = inputValues

  return (
    <S.Container>
      <NavBar />
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
        <S.Button onClick={handleLoginClick}>Log In</S.Button>
        <S.Text>
          Haven't account? Please, <Link to="/register">Sign up</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  )
}

export default Login

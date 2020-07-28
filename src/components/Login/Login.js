import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as S from "../Register/RegisterStyles"
import NavBar from "../NavBar/NavBar"
import { authServices } from "../../services/authService"

const Login = props => {
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

    const response = await authServices.login(email, password)
    if (!response.ok) {
      const error = await response.json()
      setError(error.message)
    } else {
      const data = await response.json()
      localStorage.setItem("token", data.token)
      props.history.push("/")
    }
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

export default Login

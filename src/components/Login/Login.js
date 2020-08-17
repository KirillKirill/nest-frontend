import React from "react"
import { useFormik } from "formik"
import { inject, observer } from "mobx-react"
import { Link } from "react-router-dom"
import * as S from "../Register/RegisterStyles"

const Login = ({ history, authStore }) => {
  const handleLoginClick = async (email, pass) => {
    await authStore.login(email, pass)
    if (!authStore.isFailure) {
      history.push("/")
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: ({ email, password }) => {
      handleLoginClick(email, password)
    },
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    const { setFieldValue } = formik

    setFieldValue(name, value)
    authStore.error = null
  }

  return (
    <S.Container>
      <S.Form onSubmit={formik.handleSubmit}>
        <S.Input
          onChange={handleInputChange}
          value={formik.values.email}
          type="email"
          name="email"
          placeholder="Email"
        />
        <S.Input
          onChange={handleInputChange}
          value={formik.values.password}
          type="password"
          name="password"
          placeholder="Password"
        />
        <S.ErrorText>{authStore.error}</S.ErrorText>
        <S.Button type="submit">Log In</S.Button>
        <S.Text>
          Haven&apos;t account? Please,
          <Link to="/register">Sign up</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  )
}

export default inject(store => ({
  authStore: store.store.authStore,
}))(observer(Login))

import React from "react"
import { inject, observer } from "mobx-react"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import * as S from "./RegisterStyles"

const Register = ({ history, authStore }) => {
  const handleSignUpClick = async values => {
    await authStore.register(values)

    if (!authStore.isFailure) {
      history.push("/")
    }
  }

  const getErrorForField = fieldName => {
    if (authStore.error) {
      const errorForField =
        authStore.error.find(err => err.property === fieldName) ||
        null

      return errorForField
        ? Object.values(errorForField.constraints)[0]
        : null
    }

    return null
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    onSubmit: values => {
      handleSignUpClick(values)
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
          value={formik.values.username}
          name="username"
          type="text"
          placeholder="Username"
        />
        <S.ErrorText>{getErrorForField("username")}</S.ErrorText>
        <S.Input
          onChange={handleInputChange}
          value={formik.values.email}
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <S.ErrorText>{getErrorForField("email")}</S.ErrorText>
        <S.Input
          onChange={handleInputChange}
          value={formik.values.password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <S.ErrorText>{getErrorForField("password")}</S.ErrorText>
        <S.Button
          type="submit"
          disabled={
            authStore.error ||
            !Object.values(formik.values).every(val => val.length > 0)
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

export default inject(store => ({
  authStore: store.store.authStore,
}))(observer(Register))

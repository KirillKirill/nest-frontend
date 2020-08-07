import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./EditProfileStyles"

const EditProfile = ({ history, profileStore }) => {
  const { profile } = JSON.parse(localStorage.getItem("profile"))

  const [inputValues, setInputValue] = useState({
    username: profile.username,
    email: profile.email,
  })

  const onInputChange = e => {
    const { name, value } = e.target
    setInputValue({
      ...inputValues,
      [name]: value,
    })
    profileStore.error = null
  }

  const onEditButtonClick = async e => {
    e.preventDefault()

    const { id } = profile
    const { username, email } = inputValues

    const updatedData = {
      ...profile,
      username,
      email,
    }

    await profileStore.updateProfile(id, updatedData)
  }

  const onDeleteClick = async e => {
    e.preventDefault()

    const { id } = profile
    await profileStore.deleteProfile(id)
    if (!profileStore.isFailure) {
      history.push("/")
    }
  }

  const getErrorForField = fieldName => {
    if (profileStore.error) {
      const errorForField =
        profileStore.error.find(err => err.property === fieldName) ||
        null

      return errorForField
        ? Object.values(errorForField.constraints)[0]
        : null
    }

    return null
  }

  const { username, email } = inputValues

  return (
    <S.Container>
      <S.Title>Edit Your Profile</S.Title>
      <S.EditForm>
        <S.Label>
          Name:
          <S.EditInput
            value={username}
            name="username"
            onChange={onInputChange}
          />
        </S.Label>
        <S.ErrorText>{getErrorForField("username")}</S.ErrorText>
        <S.Label>
          E-mail:
          <S.EditInput
            value={email}
            name="email"
            onChange={onInputChange}
          />
        </S.Label>
        <S.ErrorText>{getErrorForField("email")}</S.ErrorText>
        <S.EditButton onClick={onEditButtonClick}>Edit</S.EditButton>
        <S.DeleteButton onClick={onDeleteClick}>
          Delete Profile
        </S.DeleteButton>
      </S.EditForm>
    </S.Container>
  )
}

export default inject(store => ({
  profileStore: store.store.profileStore,
}))(observer(EditProfile))

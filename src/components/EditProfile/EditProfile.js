import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./EditProfileStyles"

const EditProfile = ({ history, profileStore }) => {
  const profile = JSON.parse(localStorage.getItem("profile")).profile

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
  }

  const onEditButtonClick = async e => {
    e.preventDefault()

    const { id } = profile
    const { username, email } = inputValues

    await profileStore.updateProfile(id, username, email)
  }

  const onDeleteClick = async e => {
    e.preventDefault()

    const { id } = profile
    await profileStore.deleteProfile(id)
    if (!profileStore.isFailure) {
      history.push("/")
    }
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
        <S.Label>
          E-mail:
          <S.EditInput value={email} name="email" onChange={onInputChange} />
        </S.Label>
        <S.EditButton onClick={onEditButtonClick}>Edit</S.EditButton>
        <S.DeleteButton onClick={onDeleteClick}>Delete Profile</S.DeleteButton>
      </S.EditForm>
    </S.Container>
  )
}

export default inject(store => ({
  authStore: store.store.authStore,
  profileStore: store.store.profileStore,
}))(observer(EditProfile))

import React from "react"
import { inject, observer } from "mobx-react"
import * as S from "./ProfileStyles"

const Profile = ({ profileStore }) => {
  const profile =
    profileStore.profile && JSON.parse(localStorage.getItem("profile")).profile

  return (
    <S.Container>
      <S.ProfileInfo>
        <S.SectionTitle>Your Info</S.SectionTitle>
        <S.UserText>{profile?.username}</S.UserText>
        <S.UserText>{profile?.email}</S.UserText>
        <S.UserText>{profile?.role}</S.UserText>
      </S.ProfileInfo>
    </S.Container>
  )
}

export default inject(store => ({
  profileStore: store.store.profileStore,
}))(observer(Profile))

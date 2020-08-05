import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./ProfileStyles"
import NavBar from "../NavBar/NavBar"

const Profile = ({ history, profileStore }) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function getProfile() {
      await profileStore.getProfile()
      if (!profileStore.isFailure) {
        setProfile(JSON.parse(localStorage.getItem("profile")).profile)
      }
    }

    getProfile()
  }, [profile?.id])

  return (
    <S.Container>
      <NavBar history={history} />
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

import React from "react"
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router-dom"
import * as S from "./NavBarStyles"

const NavBar = ({ history, authStore, profileStore }) => {
  const onLogoutClick = async () => {
    await authStore.logout()
    profileStore.setProfile(null)
    history.push("/")
  }

  const profile =
    profileStore.profile || JSON.parse(localStorage.getItem("profile"))?.profile

  const token = JSON.parse(localStorage.getItem("auth"))?.token

  return (
    <S.Container isAuth={!!token}>
      {token ? (
        <>
          <S.HeaderText>{`Hey, ${profile?.username}!`}</S.HeaderText>
          <S.EditButton to="/edit">Edit Profile</S.EditButton>
          <S.LinkButton to="/" onClick={onLogoutClick}>
            Log Out
          </S.LinkButton>
        </>
      ) : (
        <>
          <S.LinkButton to="/register">Sign Up</S.LinkButton>
          <S.LinkButton to="/login">Login</S.LinkButton>
        </>
      )}
    </S.Container>
  )
}

export default withRouter(
  inject(store => ({
    authStore: store.store.authStore,
    profileStore: store.store.profileStore,
  }))(observer(NavBar))
)

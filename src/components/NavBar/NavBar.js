import React from "react"
import { inject, observer } from "mobx-react"
import * as S from "./NavBarStyles"

const NavBar = ({ history, user, authStore }) => {
  const onLogoutClick = async () => {
    await authStore.logout()
    history.push("/")
  }

  const token =
    localStorage.getItem("auth") &&
    JSON.parse(localStorage.getItem("auth")).token

  return (
    <S.Container isAuth={!!user}>
      {token ? (
        <>
          <S.HeaderText>{`Hey, ${user?.username}!`}</S.HeaderText>
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

export default inject(store => ({ authStore: store.store.authStore }))(
  observer(NavBar)
)

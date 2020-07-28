import React from "react"
import * as S from "./NavBarStyles"

const NavBar = () => {
  return (
    <S.RoutesContainer>
      <S.LinkButton to="/register">Sign Up</S.LinkButton>
      <S.LinkButton to="/login">Login</S.LinkButton>
    </S.RoutesContainer>
  )
}

export default NavBar

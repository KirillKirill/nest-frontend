import React from "react"
import * as S from "./AuthStyles"

const Auth = ({ setUserToken, history }) => {
  return (
    <S.Container>
      <S.RoutesContainer>
        <S.RouteButton>Sign Up</S.RouteButton>
        <S.RouteButton>Login</S.RouteButton>
      </S.RoutesContainer>
      <S.Form>
        <S.Input value="" placeholder="Username" />
        <S.Input value="" placeholder="E-mail" />
        <S.Input value="" placeholder="Password" />
        <S.Button>Sign Up</S.Button>
      </S.Form>
    </S.Container>
  )
}

export default Auth

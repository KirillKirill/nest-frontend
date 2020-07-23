import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import { authServices } from "../../services/authService"
import { userServices } from "../../services/userService"
import * as S from "./ProfileStyles"

const Profile = ({ history }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { userId } = jwtDecode(localStorage.getItem("token"))
      const resp = await userServices.getUserById(userId)
      const result = await resp.json()

      setUser(result)
    }

    fetchUser()
  }, [])

  const onLogoutClick = () => {
    authServices
      .logout()
      .then(res => res.json())
      .then(() => {
        localStorage.removeItem("token")
        history.push("/")
      })
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText>{`Hey, ${user?.username}!`}</S.HeaderText>
        <S.LogoutButton to="/" onClick={onLogoutClick}>
          Log Out
        </S.LogoutButton>
      </S.Header>
    </S.Container>
  )
}

export default Profile

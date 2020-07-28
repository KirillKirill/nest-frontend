import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import { authServices } from "../../services/authService"
import { userServices } from "../../services/userService"
import * as S from "./ProfileStyles"

const Profile = ({ history }) => {
  const [user, setUser] = useState(null)

  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { userId } = jwtDecode(localStorage.getItem("token"))
      const resp = await userServices.getUserById(userId)
      const result = await resp.json()

      setUser(result)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await userServices.getUsers()
      const data = await response.json()
      setAllUsers(data)
    }

    fetchAllUsers()
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
      <S.ProfileInfo>
        <S.SectionTitle>Your Info</S.SectionTitle>
        <S.UserText>{user?.username}</S.UserText>
        <S.UserText>{user?.email}</S.UserText>
        <S.UserText>{user?.role}</S.UserText>
      </S.ProfileInfo>
      <S.UsersInfo>
        <S.SectionTitle>Other Users</S.SectionTitle>
        <S.OtherUsersContainer>
          {allUsers
            ?.filter(el => el.id !== user?.id)
            .map(el => (
              <S.OtherUserInfo key={el.id}>
                <S.UserText>{el?.username}</S.UserText>
                <S.UserText>{el?.email}</S.UserText>
                <S.UserText>{el?.role}</S.UserText>
              </S.OtherUserInfo>
            ))}
        </S.OtherUsersContainer>
      </S.UsersInfo>
    </S.Container>
  )
}

export default Profile

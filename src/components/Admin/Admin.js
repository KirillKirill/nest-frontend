import React, { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import * as S from "./AdminStyles"
import userServices from "../../services/userService"

const Admin = () => {
  const [admin, setAdmin] = useState(null)

  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    const fetchAdmin = async () => {
      const { userId } = jwtDecode(localStorage.getItem("token"))
      const resp = await userServices.getUserById(userId)
      const result = await resp.json()

      setAdmin(result)
    }

    fetchAdmin()
  }, [])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await userServices.getUsers()
      const data = await response.json()
      setAllUsers(data.filter(el => el.role !== "admin"))
    }

    fetchAllUsers()
  }, [])

  const onClickDeleteButton = async id => {
    await userServices.deleteUser(id)
    const response = await userServices.getUsers()
    const newUserList = await response.json()
    setAllUsers(newUserList.filter(el => el.role !== "admin"))
  }

  return (
    <S.Container>
      <S.UserList>
        <S.Title>User list</S.Title>
        <S.UsersContainer>
          {allUsers?.map(el => (
            <S.UserInfo key={el.id}>
              <S.UserText>{el?.username}</S.UserText>
              <S.UserText>{el?.email}</S.UserText>
              <S.UserText>{el?.role}</S.UserText>
              <S.DeleteButton onClick={() => onClickDeleteButton(el.id)}>
                Delete User
              </S.DeleteButton>
            </S.UserInfo>
          ))}
        </S.UsersContainer>
      </S.UserList>
    </S.Container>
  )
}

export default Admin

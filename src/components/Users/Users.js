import React, { useState, useEffect } from "react"
import NavBar from "../NavBar/NavBar"
import * as S from "./UsersStyles"
import userServices from "../../services/userService"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await userServices.getUsers()
      const data = await response.json()
      setUsers(data)
    }

    fetchAllUsers()
  }, [])
  return (
    <S.Container>
      <NavBar />
      <S.UsersContainer>
        <S.SectionTitle>List of Users</S.SectionTitle>
        <S.UserList>
          {users
            .filter(el => el.role !== "admin")
            .map(el => (
              <S.UserInfo key={el.id}>
                <S.UserText>{el?.username}</S.UserText>
                <S.UserText>{el?.email}</S.UserText>
                <S.UserText>{el?.role}</S.UserText>
              </S.UserInfo>
            ))}
        </S.UserList>
      </S.UsersContainer>
    </S.Container>
  )
}

export default Users

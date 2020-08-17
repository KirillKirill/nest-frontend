import React, { useEffect, useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./AdminStyles"

const Admin = ({ userStore }) => {
  const [users, setUsers] = useState(null)
  const [updatingUser, setUpdatingUser] = useState({
    id: "",
    email: "",
    username: "",
    role: "",
  })

  useEffect(() => {
    const fetchAllUsers = async () => {
      await userStore.getUsers()
      setUsers(userStore.users)
    }

    fetchAllUsers()
  }, [userStore])

  const onClickEditButton = id => {
    const editedUser = users.find(el => el.id === id)
    if (updatingUser?.id === id) {
      setUpdatingUser(null)
    } else {
      setUpdatingUser(editedUser)
    }
  }

  const onClickDeleteButton = async id => {
    await userStore.deleteUser(id)
    setUsers(userStore.users)
  }

  const onClickSaveButton = async () => {
    const { id } = updatingUser
    await userStore.updateUser(id, updatingUser)
    setUpdatingUser(null)
    setUsers(userStore.users)
  }

  const onChangeValue = e => {
    const { name, value } = e.target
    setUpdatingUser({
      ...updatingUser,
      [name]: value,
    })
  }

  const renderUsernameCell = user => {
    return updatingUser?.id === user.id ? (
      <S.Input
        value={updatingUser.username}
        name="username"
        onChange={onChangeValue}
      />
    ) : (
      <S.UserText>{user?.username}</S.UserText>
    )
  }

  const renderEmailCell = user => {
    return updatingUser?.id === user.id ? (
      <S.Input
        value={updatingUser.email}
        name="email"
        onChange={onChangeValue}
      />
    ) : (
      <S.UserText>{user?.email}</S.UserText>
    )
  }

  const renderRoleCell = user => {
    return updatingUser?.id === user.id ? (
      <S.Select
        name="role"
        value={updatingUser.role}
        onChange={onChangeValue}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </S.Select>
    ) : (
      <S.UserText>{user?.role}</S.UserText>
    )
  }

  return (
    <S.Container>
      <S.UserList>
        <S.Title>User list</S.Title>
        <S.UsersContainer>
          {users?.map(el => (
            <S.UserInfo key={el.id}>
              {renderUsernameCell(el)}
              {renderEmailCell(el)}
              {renderRoleCell(el)}
              <S.EditButton onClick={() => onClickEditButton(el.id)}>
                {updatingUser?.id === el.id ? "Cancel" : "Edit"}
              </S.EditButton>
              <S.DeleteButton
                disabled={updatingUser?.id}
                onClick={() => onClickDeleteButton(el.id)}
              >
                Delete User
              </S.DeleteButton>
              <S.SaveButton
                isVisible={el.id === updatingUser?.id}
                onClick={onClickSaveButton}
              >
                Save
              </S.SaveButton>
            </S.UserInfo>
          ))}
        </S.UsersContainer>
      </S.UserList>
    </S.Container>
  )
}

export default inject(store => ({
  userStore: store.store.userStore,
}))(observer(Admin))

import React, { useEffect, useState } from "react"
import { inject, observer } from "mobx-react"
import * as S from "./AdminStyles"
import userStore from "../../stores/UserStore"

const Admin = () => {
  const [allUsers, setAllUsers] = useState(null)
  const [editedId, setEditedId] = useState(null)
  const [updatedData, setUpdatedData] = useState({
    id: "",
    email: "",
    username: "",
    role: "",
  })

  useEffect(() => {
    const fetchAllUsers = async () => {
      await userStore.getUsers()
      setAllUsers(userStore.users)
    }

    fetchAllUsers()
  }, [])

  const onClickEditButton = id => {
    const editedUser = allUsers.find(el => el.id === id)
    if (editedId === id) {
      setEditedId(null)
      setUpdatedData(null)
    } else {
      setEditedId(id)
      setUpdatedData(editedUser)
    }
  }

  const onClickDeleteButton = async id => {
    await userStore.deleteUser(id)
    setAllUsers(userStore.users)
  }

  const onClickSaveButton = () => {
    setEditedId(null)
    setAllUsers(userStore.users)
  }

  const renderUsernameCell = user => {
    return editedId === user.id ? (
      <input
        value={updatedData.username}
        name="username"
        onChange={changeInputValue}
      />
    ) : (
      <S.UserText>{user?.username}</S.UserText>
    )
  }

  const renderEmailCell = user => {
    return editedId === user.id ? (
      <input
        value={updatedData.email}
        name="email"
        onChange={changeInputValue}
      />
    ) : (
      <S.UserText>{user?.email}</S.UserText>
    )
  }

  const renderRoleCell = user => {
    return editedId === user.id ? (
      <select>
        <option>user</option>
        <option>admin</option>
      </select>
    ) : (
      <S.UserText>{user?.role}</S.UserText>
    )
  }

  const changeInputValue = e => {
    const { name, value } = e
    setUpdatedData({
      ...updatedData,
      [name]: value,
    })
  }

  return (
    <S.Container>
      <S.UserList>
        <S.Title>User list</S.Title>
        <S.UsersContainer>
          {allUsers?.map(el => (
            <S.UserInfo key={el.id}>
              {renderUsernameCell(el)}
              {renderEmailCell(el)}
              {renderRoleCell(el)}
              <S.EditButton onClick={() => onClickEditButton(el.id)}>
                {editedId === el.id ? "Cancel" : "Edit"}
              </S.EditButton>
              <S.DeleteButton
                disabled={el.id === editedId}
                onClick={() => onClickDeleteButton(el.id)}
              >
                Delete User
              </S.DeleteButton>
              <S.SaveButton
                isVisible={el.id === editedId}
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

import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { User } from 'types';
import * as S from 'components/Admin/AdminStyles';

const Admin: React.FC = ({ userStore }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [updatingUser, setUpdatingUser] = useState<User>({
    id: undefined,
    email: '',
    username: '',
    role: '',
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      await userStore.getUsers();
      setUsers(userStore.users);
    };

    fetchAllUsers();
  }, [userStore]);

  const onClickEditButton = (id: number) => {
    const editedUser = users?.find(el => el.id === id);
    if (updatingUser?.id === id) {
      setUpdatingUser({
        id: undefined,
        email: '',
        username: '',
        role: '',
      });
    } else {
      setUpdatingUser(editedUser!);
    }
  };

  const onClickDeleteButton = async (id: number) => {
    await userStore.deleteUser(id);
    setUsers(userStore.users);
  };

  const onClickSaveButton = async () => {
    const { id } = updatingUser;

    await userStore.updateUser(id, updatingUser);
    setUpdatingUser({
      id: undefined,
      email: '',
      username: '',
      role: '',
    });
    setUsers(userStore.users);
  };

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatingUser({
      ...updatingUser,
      [name]: value,
    });
  };

  const renderUsernameCell = (user: User) => {
    return updatingUser?.id === user.id ? (
      <S.Input
        value={updatingUser.username}
        name='username'
        onChange={onChangeValue}
      />
    ) : (
      <S.UserText>{user?.username}</S.UserText>
    );
  };

  const renderEmailCell = (user: User) => {
    return updatingUser?.id === user.id ? (
      <S.Input
        value={updatingUser.email}
        name='email'
        onChange={onChangeValue}
      />
    ) : (
      <S.UserText>{user?.email}</S.UserText>
    );
  };

  const renderRoleCell = (user: User) => {
    return updatingUser?.id === user.id ? (
      <S.Select name='role' value={updatingUser.role} onChange={onChangeValue}>
        <option value='user'>user</option>
        <option value='admin'>admin</option>
      </S.Select>
    ) : (
      <S.UserText>{user?.role}</S.UserText>
    );
  };

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
              <S.EditButton onClick={() => onClickEditButton(Number(el.id))}>
                {updatingUser?.id === el.id ? 'Cancel' : 'Edit'}
              </S.EditButton>
              <S.DeleteButton
                disabled={updatingUser?.id !== undefined}
                onClick={() => onClickDeleteButton(Number(el.id))}
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
  );
};

export default inject((store: any) => ({
  userStore: store.store.userStore,
}))(observer(Admin));

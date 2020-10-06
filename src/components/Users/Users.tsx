import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { User } from 'types';
import * as S from 'components/Users/UsersStyles';

const Users: React.FC = ({ userStore }: any) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      await userStore.getUsers();
      setUsers(userStore.users);
    };

    fetchAllUsers();
  }, [userStore]);

  return (
    <S.Container>
      <S.UsersContainer>
        <S.SectionTitle>List of Users</S.SectionTitle>
        <S.UserList>
          {users
            .filter(el => el.role !== 'admin')
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
  );
};

export default inject((store: any) => ({
  userStore: store.store.userStore,
}))(observer(Users));

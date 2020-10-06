import React from 'react';
import { inject, observer } from 'mobx-react';
import * as S from './NavBarStyles';
import { getToken, getAccount } from 'utils';

type NavBarProps = {
  authStore?: any;
  profileStore?: any;
};

const NavBar: React.FC<NavBarProps> = ({
  authStore,
  profileStore,
}: NavBarProps) => {
  const onLogoutClick = async () => {
    await authStore.logout();
  };

  const profile = profileStore.profile || getAccount()?.profile;

  const token = getToken();

  return (
    <S.Container isAuth={!!token}>
      {token ? (
        <>
          <S.LeftHeaderContainer>
            <S.HeaderText>{`Hey, ${profile?.username}!`}</S.HeaderText>
            <S.LinkButton to='/'>Profile</S.LinkButton>
          </S.LeftHeaderContainer>
          <S.RightHeaderContainer>
            <S.LinkButton to='/edit'>Edit Profile</S.LinkButton>
            {profile?.role === 'admin' ? (
              <S.LinkButton to='/admin'>Admin</S.LinkButton>
            ) : null}
            <S.LinkButton to='/users'>Users</S.LinkButton>
            <S.LinkButton to='/' onClick={onLogoutClick}>
              Log Out
            </S.LinkButton>
          </S.RightHeaderContainer>
        </>
      ) : (
        <>
          <S.LeftHeaderContainer>
            <S.LinkButton to='/users'>Users</S.LinkButton>
          </S.LeftHeaderContainer>
          <S.RightHeaderContainer>
            <S.LinkButton to='/register'>Sign Up</S.LinkButton>
            <S.LinkButton to='/login'>Login</S.LinkButton>
          </S.RightHeaderContainer>
        </>
      )}
    </S.Container>
  );
};

export default inject((store: any) => ({
  authStore: store.store.authStore,
  profileStore: store.store.profileStore,
}))(observer(NavBar));

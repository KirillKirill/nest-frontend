import React from 'react';
import { inject, observer } from 'mobx-react';
import { getAccount } from 'utils';
import * as S from './ProfileStyles';

const Profile: React.FC = ({ profileStore }: any) => {
  const profile = profileStore.profile || getAccount().profile;

  return (
    <S.ProfileInfo>
      <S.SectionTitle>Your Info</S.SectionTitle>
      <S.UserText>{profile?.username}</S.UserText>
      <S.UserText>{profile?.email}</S.UserText>
      <S.UserText>{profile?.role}</S.UserText>
    </S.ProfileInfo>
  );
};

export default inject((store: any) => ({
  profileStore: store.store.profileStore,
}))(observer(Profile));

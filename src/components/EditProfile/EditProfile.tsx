import React from 'react';
import { inject, observer } from 'mobx-react';
import { useFormik } from 'formik';
import { getAccount } from 'utils';
import * as S from 'components/EditProfile/EditProfileStyles';
import { Error } from 'types';

const EditProfile: React.FC = ({ profileStore }: any) => {
  const { profile } = getAccount();

  const onEditButtonClick = async (username: string, email: string) => {
    const { id } = profile;

    const updatedData = {
      ...profile,
      username,
      email,
    };

    await profileStore.updateProfile(id, updatedData);
  };

  const formik = useFormik({
    initialValues: {
      username: profile.username,
      email: profile.email,
    },

    onSubmit: ({ username, email }) => {
      onEditButtonClick(username, email);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setFieldValue } = formik;

    setFieldValue(name, value);
    profileStore.error = null;
  };

  const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { id } = profile;
    await profileStore.deleteProfile(id);
  };

  const getErrorForField = (fieldName: string): any => {
    if (profileStore.error) {
      const errorForField =
        profileStore.error.find((err: Error) => err.property === fieldName) ||
        null;

      return errorForField ? Object.values(errorForField.constraints)[0] : null;
    }

    return null;
  };

  return (
    <S.Container>
      <S.Title>Edit Your Profile</S.Title>
      <S.EditForm onSubmit={formik.handleSubmit}>
        <S.Label>
          Name:
          <S.EditInput
            value={formik.values.username}
            name='username'
            type='text'
            onChange={handleInputChange}
          />
        </S.Label>
        <S.ErrorText>{getErrorForField('username')}</S.ErrorText>
        <S.Label>
          E-mail:
          <S.EditInput
            value={formik.values.email}
            name='email'
            type='email'
            onChange={handleInputChange}
          />
        </S.Label>
        <S.ErrorText>{getErrorForField('email')}</S.ErrorText>
        <S.EditButton type='submit'>Edit</S.EditButton>
        <S.DeleteButton onClick={onDeleteClick}>Delete Profile</S.DeleteButton>
      </S.EditForm>
    </S.Container>
  );
};

export default inject((store: any) => ({
  profileStore: store.store.profileStore,
}))(observer(EditProfile));

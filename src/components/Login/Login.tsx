import React from 'react';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as S from 'components/Register/RegisterStyles';

const Login: React.FC = ({ authStore }: any) => {
  const handleLoginClick = async (email: string, pass: string) => {
    await authStore.login(email, pass);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async ({ email, password }) => {
      await handleLoginClick(email, password);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setFieldValue } = formik;

    setFieldValue(name, value);
    authStore.error = null;
  };

  return (
    <S.Container>
      <S.Form onSubmit={formik.handleSubmit}>
        <S.Input
          onChange={handleInputChange}
          value={formik.values.email}
          type='email'
          name='email'
          placeholder='Email'
        />
        <S.Input
          onChange={handleInputChange}
          value={formik.values.password}
          type='password'
          name='password'
          placeholder='Password'
        />
        <S.ErrorText>{authStore.error}</S.ErrorText>
        <S.Button type='submit'>Log In</S.Button>
        <S.Text>
          Haven&apos;t account? Please,
          <Link to='/register'>Sign up</Link>
        </S.Text>
      </S.Form>
    </S.Container>
  );
};

export default inject((store: any) => ({
  authStore: store.store.authStore,
}))(observer(Login));

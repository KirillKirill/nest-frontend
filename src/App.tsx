import React from 'react';
import { Provider } from 'mobx-react';
import AppRouter from 'components/AppRouter';
import { GlobalStyle } from 'styled';
import globalStore from './stores';

const App = () => {
  return (
    <Provider store={globalStore}>
      <AppRouter />
      <GlobalStyle />
    </Provider>
  );
};

export default App;

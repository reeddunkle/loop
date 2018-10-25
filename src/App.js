import React from 'react';
import styled from 'styled-components';
import { LoopView } from './screens';

const AppContainer = styled.div`
  margin: 4em;
  text-align: center;
`;

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <LoopView />
      </AppContainer>
    );
  }
}

export default App;

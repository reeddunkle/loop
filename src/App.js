import React from 'react';
import styled from 'styled-components';
import { LoopView } from './screens';
import { AppTitle } from './components';

const AppContainer = styled.div`
  margin: 4em;
  text-align: center;
`;

const AppHeader = styled.header`
  align-items: center;
  background-color: #a9d6d3;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  margin-bottom: 1em;
  min-height: 7vh;
`;

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <AppTitle title="Loop" />
        </AppHeader>
        <LoopView />
      </AppContainer>
    );
  }
}

export default App;

import React, { useState } from 'react';
import logo from './logo.svg';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UserSetup from './Pages/UserSetup';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import styled,{ createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

function App() {
  const [height, setHeight] = useState("667px")

  return (
    <>
      <GlobalStyle />
      <MainWrapper height={height}>
        <BrowserRouter>
          <Switch>
            <Route path={"/usersetup"}>
              <UserSetup />
            </Route>
            <Route path={"/top"}>
              <MainPage height={height} setHeight={setHeight} />
            </Route>
            <Route path={"/menu"}>

            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/signup"}>
              <Signup />
            </Route>
            <Route path={"/complete"}>
              aaaaa
            </Route>
          </Switch>
        </BrowserRouter>
      </MainWrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}

    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
`;

const MainWrapper = styled.div<{height: string}>`
  width: 375px;
  height: ${({height}) => height};
  background-color: #fff;
  margin: 40px auto;
  color: #4B4B4B;
  padding-top: 68px;
  box-sizing: border-box;
`;

export default App;

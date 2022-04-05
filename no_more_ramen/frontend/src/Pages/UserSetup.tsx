import React from 'react'
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import { useHistory } from 'react-router-dom';
import { Button, Message } from '../components/components';
import { ReactComponent as Noodle } from '../icons/noodle.svg';
import { NoodleIcon } from '../components/components';
import styled from 'styled-components';

const UserSetup = () => {
  const history = useHistory();
  return (
    <UserSetupWrapper>
        <NoodleIcon>
            <Noodle />
        </NoodleIcon>
        <Message>あなたのラーメン指数<br/>を測りましょう。</Message>

        <LinkWrapper>
            <Link to={"/signup"} style={{ textDecoration: 'none' }}><Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"}>登録する</Button></Link>
            <Link to={"/login"} style={{ textDecoration: 'none' }}><Button bgColor={"#fff"} color={"#2BAD62"} stroke={"1px solid #2BAD62"}>ログイン</Button></Link>
        </LinkWrapper>
        

        <BrowserRouter>
            <Route path={"/signup"}>
                <Signup />
            </Route>
            <Route path={"/login"}>
                <Login />
            </Route>
        </BrowserRouter>
    </UserSetupWrapper>
  )
}

const UserSetupWrapper = styled.div`
    padding-bottom: 254.125px;
`

const LinkWrapper = styled.div`
    margin-top: 100px;
`;

export default UserSetup
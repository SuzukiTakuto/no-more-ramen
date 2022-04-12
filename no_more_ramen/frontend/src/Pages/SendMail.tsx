import React, { useEffect } from 'react';
import styled from 'styled-components';
import CompleteNoodle from '../icons/completeNoodle';
import { Button, Message } from '../components/components';
import { useParams, useHistory } from 'react-router-dom';

const SendMail = () => {
  const history = useHistory();

  const onClick = () => {
    history.push('/login');
  }

  return (
    <CompleteContainer>
        <CompleteNoodleIcon>
            <CompleteNoodle />
        </CompleteNoodleIcon>
        <Message>メールをお送りしました。</Message>
        <Button bgColor={"#fff"} color={"#2BAD62"} stroke={"1px solid #2BAD62"} mt={"242px auto 0;"} onClick={() => onClick()}>戻る</Button>
    </CompleteContainer>
  )
}

const CompleteContainer = styled.div`

`;

const CompleteNoodleIcon = styled.div`
    width: 101.36px;
    height: 162.16px;
    margin: 0 auto 25.3px;;
`;

export default SendMail
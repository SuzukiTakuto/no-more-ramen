import React, { useEffect } from 'react';
import { apiUrl } from '../utils';
import styled from 'styled-components';
import CompleteNoodle from '../icons/completeNoodle';
import { Button, Message } from '../components/components';
import { useParams, useHistory } from 'react-router-dom';

type Param = {
    token: string;
}

const Complete = () => {
  const param = useParams<Param>();
  console.log(param.token);
  useEffect(() => {
      fetch(`${apiUrl}/account/create/complete/${param.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
          return res.json();
      }).then((data) => {
        console.log(data.access)
        localStorage.setItem("token", data.access);
      }).catch(() => {
          console.log("error");
      });
  }, []);

  return (
    <CompleteContainer>
        <CompleteNoodleIcon>
            <CompleteNoodle />
        </CompleteNoodleIcon>
        <Message>登録完了</Message>
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

export default Complete
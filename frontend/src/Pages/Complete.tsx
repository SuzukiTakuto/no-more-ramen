import React, { useEffect } from 'react';
import { apiUrl } from '../utils';
import styled from 'styled-components';
import CompleteNoodle from '../icons/completeNoodle';
import { Button, Message } from '../components/components';
import { useParams, useHistory } from 'react-router-dom';

type Param = {
    token: string;
}

type Props = {
  setHeight: React.Dispatch<React.SetStateAction<string>>
}


const Complete = (props: Props) => {
  props.setHeight("667px");
  const param = useParams<Param>();
  const history = useHistory();
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
          console.log(data);
        console.log(data.access)
        localStorage.setItem("token", data.access);
      }).catch(() => {
          console.log("error");
      });
  }, []);

  return (
    <CompleteContainer>
        <CompleteNoodleIcon rotate={true}>
            <CompleteNoodle />
        </CompleteNoodleIcon>
        <Message>登録完了が完了しました！<br/>早速始めてみましょう。</Message>
        <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"} mt={"95px auto;"} onClick={() => history.push("/top")}>始める</Button>
    </CompleteContainer>
  )
}

const CompleteContainer = styled.div`

`;

type IconProps = {
  rotate: boolean;
}

const CompleteNoodleIcon = styled.div<{rotate: boolean}>`
    width: 101.36px;
    height: 162.16px;
    margin: 0 auto 25.3px;
    ${({rotate}) => rotate ? "transform: rotate(180deg)" : "transform: rotate(0deg)"};
`;

export default Complete
import React from 'react';
import styled from 'styled-components';
import { QuestionText } from '../components/components';

type Props ={
  rice: boolean,
  setRice: React.Dispatch<React.SetStateAction<boolean>>,
}

const Rice = (props: Props) => {
  return (
    <RiceContainer>
        <QuestionText>ご飯は？</QuestionText>
        <SelectRice>
            <RiceOption onClick={() => props.setRice(true)} rice={props.rice} riceValue={true} color={"#E0470E"}>もちろん</RiceOption>
            <RiceOption onClick={() => props.setRice(false)} rice={props.rice} riceValue={false} color={"#2BAD62"}>いいえ</RiceOption>
        </SelectRice>
    </RiceContainer>
  )
}

const RiceContainer = styled.div`
  width: 280px;
  margin: 8px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectRice = styled.div`
  width: 144px;
  height: 30px;
  border: 1px solid #2BAD62;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RiceOption = styled.button<{rice: boolean, riceValue: boolean, color: string}>`
  border: none;
  width: 64px;
  height: 20px;
  border-radius: 10px; 
  font-size: 12px;
  color: ${({rice, riceValue, color}) => rice !== riceValue ? color : "#fff"};
  background-color: ${({rice, riceValue, color}) => rice !== riceValue ? "#fff" : color};
`;

export default Rice
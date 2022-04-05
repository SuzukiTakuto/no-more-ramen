import React, { useEffect, useState } from 'react';
import { Message, Button } from '../components/components';
import { ReactComponent as Noodle } from '../icons/noodle.svg';
import { NoodleIcon } from '../components/components';
import { apiUrl } from '../utils';
import styled from 'styled-components';
import Parameters from '../components/Parameters'
import Footer from '../components/Footer';
import Calender from '../components/Calender';
import Arrow from '../icons/Arrow';

type User = {
    index: number;
    run: number;
    walk: number;
    days: number;
};

type Color = {
    [key: string]: string
};

const colorState: Color = {
    "health": "#2BAD62",
    "omg": "#FFC400",
    "danger": "#E0470E" 
}



type Props = {
    height: string;
    setHeight: React.Dispatch<React.SetStateAction<string>>;
}

const MainPage = (props: Props) => {
  props.setHeight("auto");
  const [userData, setUserdata] = useState<User>({
    index: 0,
    run: 0,
    walk: 0,
    days: 0,
  });

  const [nowColor, setNowColor] = useState<string>("health");
  const [comment, setComment] = useState<string>("けんこう");

  const [oneMoreText, setOneMoreText] = useState('一杯食べた?');
  const [isCalender, setIsCalender] = useState(false);
  console.log(isCalender);
  
  /*useEffect(() => {
      fetch(`${apiUrl}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' +,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setUserdata({
            index: data.index,
            run: data.run,
            walk: data.run,
            days: data.days
        });
        if (userData.index > 6000) {
            setNowColor("omg");
            setComment("気持ち多め");
        }
        if (userData.index > 15000) {
            setNowColor("danger");
            setComment("ヤバみ");
        }
      }).catch(() => {
        console.log('error');
      })
  })*/

  return (
    <div>
        <NoodleIcon>
            <Noodle />
        </NoodleIcon>
        <Message>あなたのラーメン指数</Message>
        <Index color={colorState[nowColor]}>10</Index>
        <Comment>{comment}</Comment>
        <Parameters state={nowColor} color={colorState[nowColor]} value='13' />
        {isCalender && <Calender />}
        {isCalender ? 
        <Arrow color={colorState[nowColor]} isCalender={isCalender} setIsCalender={setIsCalender} /> 
        : <Button 
            bgColor={"#fff"} 
            color={colorState[nowColor]} 
            stroke={`1px solid ${colorState[nowColor]}`} 
            onClick={() => setIsCalender(!isCalender)}>
                詳細
        </Button>}
        <Footer color={colorState[nowColor]} text={oneMoreText} />
    </div>
  )
}

const Index = styled.h1<{color: string}>`
    font-size: 83px;
    font-weight: 600;
    text-align: center;
    color: ${ ({ color }) => color };
`;

const Comment = styled.h2`
    text-align: center;
    font-size: 24px;
    padding-top: 8px;
    font-weight: 600;
`;



export default MainPage
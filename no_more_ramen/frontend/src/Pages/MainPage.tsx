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
import SettingIcon from '../icons/SettingIcon';
import { useHistory } from 'react-router-dom';
import { UserParam, CalenderType } from '../type/type'
import CompleteNoodle from '../icons/completeNoodle';


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
  const history = useHistory();
  props.setHeight("auto");
  const [userParamData, setUserParamData] = useState<UserParam>({
    index: 0,
    run: 0,
    walk: 0,
    days: 0,
  });

  const calenderInit = [false, false, false, false, false, false, false];

  const [calender, setCalender] = useState<CalenderType>({
    week1: calenderInit,
    week2: calenderInit,
    week3: calenderInit,
    week4: calenderInit,
    week5: calenderInit,
  });

  const [nowColor, setNowColor] = useState<string>("health");
  const [comment, setComment] = useState<string>("けんこう");

  const [oneMoreText, setOneMoreText] = useState('一杯食べた?');
  const [isCalender, setIsCalender] = useState(false);
  
  const onClick = () => {
    history.push(`/setting/${nowColor}`);
  }
  
  useEffect(() => {
      fetch(`${apiUrl}/account/information/`, {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
          console.log(data);
        console.log(data.username);
        if (data.status !== 200) history.push("login");
      }).catch(() => {
        console.log('error');
      });

      
      fetch(`${apiUrl}/ramen_record/parameters/`, {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
          console.log(data);
        setUserParamData({
            index: data.ramen_point as number,
            run: data.walking_cal_per_km,
            walk: data.walking_cal_per_hour,
            days: data.metabolism,
        });

      }).catch(() => {
        console.log('error');
      });

      fetch(`${apiUrl}/ramen_record/calender/`, {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        setCalender(data);
      }).catch(() => {
        console.log('error');
      });
  }, []);

  useEffect(() => {
      if (userParamData.index > 6000) {
            setNowColor("omg");
            setComment("気持ち多め");
            console.log(comment);
      }
      else if (userParamData.index > 15000) {
            setNowColor("danger");
            setComment("ヤバみ");
      }
      else {
        setNowColor("health");
        setComment("けんこう");
      }
        
  }, [userParamData])

  return (
    <div>
        <Setting>
          <SettingIcon color={colorState[nowColor]} onClick={onClick} />
        </Setting>
        <NoodleIcon>
            <Noodle />
        </NoodleIcon>
        <Message>あなたのラーメン指数</Message>
        <Index color={colorState[nowColor]}>{userParamData.index}</Index>
        <Comment>{comment}</Comment>
        <Parameters state={nowColor} color={colorState[nowColor]} value='13' parameter={userParamData} />
        {isCalender && <Calender color={colorState[nowColor]} calender={calender} />}
        {isCalender ? 
        <Arrow color={colorState[nowColor]} isCalender={isCalender} setIsCalender={setIsCalender} /> 
        : <Button 
            bgColor={"#fff"} 
            color={colorState[nowColor]} 
            stroke={`1px solid ${colorState[nowColor]}`} 
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              setIsCalender(!isCalender);
            }}>
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

const Setting = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;



export default MainPage
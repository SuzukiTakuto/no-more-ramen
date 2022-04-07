import React from 'react';
import styled from 'styled-components';
import {CalenderType} from '../type/type';

type Props = {
  color: string,
  calender: CalenderType
}

const Calender = (props: Props) => {
  const weekSet = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <CalenderContainer>
        <Text>食べた分のカロリーを60kgの男性がウォーキング
でチャラにできる距離と時間、および基礎代謝分</Text>
        <CalenderTable>
          <CalenderTr>
            <CalenderTh>1st</CalenderTh>
            {props.calender.week1.map((day,value) =>
              day ? <CalenderTd eat={true} color={props.color}>{weekSet[value]}</CalenderTd> : <CalenderTd eat={false} color={props.color}>{weekSet[value]}</CalenderTd>
            )}
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>2nd</CalenderTh>
            {props.calender.week2.map((day,value) =>
                day ? <CalenderTd eat={true} color={props.color}>{weekSet[value]}</CalenderTd> : <CalenderTd eat={false} color={props.color}>{weekSet[value]}</CalenderTd>
            )}
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>3rd</CalenderTh>
            {props.calender.week3.map((day,value) =>
              day ? <CalenderTd eat={true} color={props.color}>{weekSet[value]}</CalenderTd> : <CalenderTd eat={false} color={props.color}>{weekSet[value]}</CalenderTd>
            )}
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>4th</CalenderTh>
            {props.calender.week4.map((day,value) =>
              day ? <CalenderTd eat={true} color={props.color}>{weekSet[value]}</CalenderTd> : <CalenderTd eat={false} color={props.color}>{weekSet[value]}</CalenderTd>
            )}
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>5th</CalenderTh>
            {props.calender.week5.map((day,value) =>
                day ? <CalenderTd eat={true} color={props.color}>{weekSet[value]}</CalenderTd> : <CalenderTd eat={false} color={props.color}>{weekSet[value]}</CalenderTd>
            )}
          </CalenderTr>
        </CalenderTable>
        
    </CalenderContainer>
  )
}

const CalenderContainer = styled.div`
    width: 272px;
    margin: 0 auto;
`;

const Text = styled.p`
    font-size: 12px;
    line-height: 1.6;
`;

const CalenderTable = styled.table`
  width: 252px;
  margin: 18px auto 0;
  border-collapse:separate;
  border-spacing: 4px 3px;
`;

const CalenderTr = styled.tr`

`;

const CalenderTh = styled.th`
  font-size; 14px;
  color: #8C8C8C;
  font-family: "Noto Sans";
  text-align: left;
`;

const CalenderTd = styled.td<{eat: boolean, color: string}>`
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  background-color: ${({eat, color}) => eat ? color : "#fff"};
  color: ${({eat, color}) => eat ? "#fff" : color};
  border-radius: 50%;
`;

const WeekNo = styled.p``

export default Calender
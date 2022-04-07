import React from 'react';
import styled from 'styled-components';

type Props = {
  color: string,
}

const Calender = (props: Props) => {
  return (
    <CalenderContainer>
        <Text>食べた分のカロリーを60kgの男性がウォーキング
でチャラにできる距離と時間、および基礎代謝分</Text>
        <CalenderTable>
          <CalenderTr>
            <CalenderTh>1st</CalenderTh>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>2nd</CalenderTh>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>3rd</CalenderTh>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>4th</CalenderTh>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
          </CalenderTr>
          <CalenderTr>
            <CalenderTh>5th</CalenderTh>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
            <CalenderTd>日</CalenderTd>
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

type CalenderTdProps = {
  color: string
}

const CalenderTd = styled.td`
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
`;

const WeekNo = styled.p``

export default Calender
import React from 'react';
import styled from 'styled-components';

const Calender = () => {
  return (
    <CalenderContainer>
        <Text>食べた分のカロリーを60kgの男性がウォーキング
でチャラにできる距離と時間、および基礎代謝分</Text>
        <p>1st   日　月　火　水　木　金　土</p>
        <p>2nd  日　月　火　水　木　金　土</p>
        3rd  日　月　火　水　木　金　土
        4th  日　月　火　水　木　金　土
        5th  日　月　火　水　木　金　土
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

const CalenderContents = styled.div`

`;

export default Calender
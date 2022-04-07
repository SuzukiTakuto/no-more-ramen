import React from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';

const RankingList = () => {
  return (
    <div>
        <RankingItem score={15000} iconNo={"1"} username={"takt"} rank={1} />
    </div>
  )
}

export default RankingList
import React from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';
import { RankItem } from '../type/type';
import DottedLine from '../icons/DottedLine';

type Props = {
  rankList: RankItem[],
  myRank: RankItem
}

const RankingList = (props: Props) => {
  return (
    <div>
        {props.rankList.map((item, index) => (
          <RankingItem score={index + 1} icon_id={item.icon_id} username={item.username} rank={item.rank} />
        ))}
        {props.myRank.rank < 21 && (
          <>
            <DottedLine />
            <RankingItem score={props.myRank.score} icon_id={props.myRank.icon_id} username={props.myRank.username} rank={props.myRank.rank} bgcolor={"rgba(75, 75, 75, 0.1)"} />
          </>
        )}
    </div>
  )
}

export default RankingList
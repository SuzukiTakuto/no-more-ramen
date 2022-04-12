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
          <RankingItem calorie_per_month={item.calorie_per_month} icon_id={item.icon_id} username={item.username} rank={index + 1} />
        ))}
        {props.myRank.rank > 20 && (
          <>
            <DottedLine />
            <RankingItem calorie_per_month={props.myRank.calorie_per_month} icon_id={props.myRank.icon_id} username={props.myRank.username} rank={props.myRank.rank} bgcolor={"rgba(75, 75, 75, 0.1)"} />
          </>
        )}
    </div>
  )
}

export default RankingList
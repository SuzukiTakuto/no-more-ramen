import React, { useState, useEffect } from 'react';
import { apiUrl } from '../utils';
import { Input, Button, BackIcon } from '../components/components';
import styled from 'styled-components';
import Noodle_small from '../icons/Noodle_small';
import Back from '../icons/Back';
import { useHistory, useParams } from 'react-router-dom';
import RankingList from '../components/RankingList';
import { RankItem } from '../type/type';

type Props = {
    setHeight: React.Dispatch<React.SetStateAction<string>>
}

const Ranking = (props: Props) => {
    const history = useHistory();
    props.setHeight("667px");

    const back = () => {
        history.push("/top");
    }


    const [rankList, setRnakList] = useState<RankItem[]>([]);
    const [myRank, setMuRank] = useState<RankItem>({
      calorie_per_month: 0,
      icon_id: 0,
      username: "",
      rank: 0
    });

    useEffect(() => {
        fetch(`${apiUrl}/ramen_record/rank/`, {
            method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        if (data.status === 200) {
          setRnakList(data.rank);
          setMuRank(data.my_rank);
        }
      }).catch(() => {
        console.log('error');
      });
    })

  return (
    <RankingContainer>
        <BackIcon onClick={() => back()}>
            <Back />
        </BackIcon>
        <NoodleIcon>
            <Noodle_small />
        </NoodleIcon>
        <RankingTitle>ランキング</RankingTitle>
        <RankingList rankList={rankList} myRank={myRank} />
    </RankingContainer>
  )
}

const RankingContainer = styled.div`
    margin-top: -41.2px;
`;

const NoodleIcon = styled.div`
    width: 49px;
    height: 49.55px;
    margin: 0 auto;
`;

const RankingTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #4B4B4B;
    text-align: center;
    margin-top: 42.6px;
`;

export default Ranking
import React from 'react';
import { apiUrl } from '../utils';
import { Input, Button, BackIcon } from '../components/components';
import styled from 'styled-components';
import Noodle_small from '../icons/Noodle_small';
import Back from '../icons/Back';
import { useHistory, useParams } from 'react-router-dom';
import RankingList from '../components/RankingList';

type Props = {
    setHeight: React.Dispatch<React.SetStateAction<string>>
}

const Ranking = (props: Props) => {
    const history = useHistory();
    props.setHeight("667px");

    const back = () => {
        history.push("/top");
    }
  return (
    <RankingContainer>
        <BackIcon onClick={() => back()}>
            <Back />
        </BackIcon>
        <NoodleIcon>
            <Noodle_small />
        </NoodleIcon>
        <RankingTitle>ランキング</RankingTitle>
        <RankingList />
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
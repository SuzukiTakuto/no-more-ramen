import React from 'react';
import styled from 'styled-components';
import { QuestionText } from '../components/components';

type Props = {
  volume: string,
  setVolume: React.Dispatch<React.SetStateAction<string>>,
}

const Volume = (props: Props) => {
  return (
    <VolumeContainer>
      <QuestionText>大きさは？</QuestionText>
      <SelectVolume>
        <VolumeOption onClick={() => props.setVolume("large")} volume={props.volume} volumeValue={"large"} color={"#E0470E"}>大</VolumeOption>
        <VolumeOption onClick={() => props.setVolume("medium")} volume={props.volume} volumeValue={"medium"} color={"#FFC400"}>中</VolumeOption>
        <VolumeOption onClick={() => props.setVolume("small")} volume={props.volume} volumeValue={"small"} color={"#2BAD62"}>小</VolumeOption>
      </SelectVolume>
    </VolumeContainer>
  )
}

const VolumeContainer = styled.div`
  width: 280px;
  margin: 8px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectVolume = styled.div`
  width: 144px;
  height: 30px;
  border: 1px solid #2BAD62;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
`;

const VolumeOption = styled.button<{volume: string, volumeValue: string, color: string}>`
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  color: ${({volume, volumeValue, color}) => volume !== volumeValue ? color : "#fff"};
  background-color: ${({volume, volumeValue, color}) => volume !== volumeValue ? "#fff" : color};
`;

export default Volume
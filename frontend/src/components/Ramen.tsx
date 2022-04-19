import React from 'react';
import RamenImteIcon from '../icons/RamenImteIcon';

import styled from 'styled-components';
import { type } from 'os';

type RamenProps = {
    name: string,
    color: string,
    fullName: string,
    value: string,
    type: string,
    setType: React.Dispatch<React.SetStateAction<string>>,
}

const Ramen = (props: RamenProps) => {
  let code = props.color;
  let red   = parseInt(code.substring(1,3), 16);
  let green = parseInt(code.substring(3,5), 16);
  let blue  = parseInt(code.substring(5,7), 16);
  const transparentColor = `rgba(${red}, ${green}, ${blue}, 0.1);`

  return (
    <RamenItem transparentColor={transparentColor} color={props.color} value={props.value} ramenType={props.type} onClick={() => {
        console.log(props.value);
        props.setType(props.value);
        console.log(props.type);
    }}>
        <RamenItemContainer>
            <RamenName color={props.color} value={props.value} ramenType={props.type}>{props.name}</RamenName>
            <RamenImteIcon color={props.value !== props.type ? props.color : "#fff"} />
            <RamenFullName color={props.color} value={props.value} ramenType={props.type}>{props.fullName}</RamenFullName>
        </RamenItemContainer>
    </RamenItem>
  )
}

const RamenItem = styled.button<{transparentColor: string, color: string, value: string, ramenType: string}>`
    width: 133px;
    height: 80px;
    margin: 8px auto 0;
    background-color: ${({transparentColor, color, value, ramenType}) => value !== ramenType ? transparentColor : color};
    border-radius: 8px;
    border: none;
`;

const RamenItemContainer = styled.div`
    width: 80px;
    margin: 0 auto;
`;

const RamenName = styled.p<{color: string, value: string, ramenType: string}>`
    font-size: 16px;
    text-align: center;
    color: ${({color, value, ramenType}) => value !== ramenType ? color : "#fff;" };
`;

const RamenFullName = styled.p<{color: string, value: string, ramenType: string}>`
    font-size: 12px;
    text-align: center;
    color: ${({color, value, ramenType}) => value !== ramenType ? color : "#fff;"};
`;

export default Ramen
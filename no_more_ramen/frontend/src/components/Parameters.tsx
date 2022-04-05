import React from 'react'
import styled from 'styled-components';
import ParamIcon from '../icons/ParamIcon';

type Props = {
    state: string;
    color: string;
    value: string;
}

const Parameters = (props: Props) => {
  return (
    <div>
        <ParamWrapper>
            <Param>
                <ParamIcon state={props.state} color={props.color} item={'run'} />
                <ParamValue color={props.color}>16</ParamValue>
                <Unit color={props.color}>km</Unit>
            </Param>
            <Param>
                <ParamIcon state={props.state} color={props.color} item={'walk'} />
                <ParamValue color={props.color}>5</ParamValue>
                <Unit color={props.color}>Hours</Unit>
            </Param>
            <Param>
                <ParamIcon state={props.state} color={props.color} item={'days'} />
                <ParamValue color={props.color}>1</ParamValue>
                <Unit color={props.color}>Days</Unit>
            </Param>
        </ParamWrapper>
    </div>
  )
}

const ParamWrapper = styled.div`
    width: 295px;
    margin: 34.9px auto 28px;
    display: flex;
    justify-content: space-around;
`;

const Param = styled.div`
    width: 63px;
`;

const ParamValue = styled.p<{color: string}>`
    color: ${ ({ color }) => color };
    text-align: center;
    font-size: 32px;
    margin-top: 8px;
`;

const Unit = styled.p<{color: string}>`
color: ${ ({ color }) => color };
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
`;

export default Parameters
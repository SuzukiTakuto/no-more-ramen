import React from 'react';
import styled from 'styled-components';

type Props = {
    color: string,
    userIcon: string,
    setUserIcon: React.Dispatch<React.SetStateAction<string>>
}

const Icon3 = (props: Props) => {
  return (
    <IconContainer color={props.color} userIcon={props.userIcon} onClick={(e) => {
        e.preventDefault();
        props.setUserIcon("2");
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18">
        <text id="マシ_マシ" data-name="マシ
        マシ" transform="translate(0 7)" fill={props.userIcon === "2" ? "#fff" : props.color} font-size="8" font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"><tspan x="0" y="0">マシ</tspan><tspan x="0" y="10">マシ</tspan></text>
        </svg>
    </IconContainer>
  )
}

const IconContainer = styled.button<{color: string, userIcon: string}>`
    border: none;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({color, userIcon}) => userIcon === "2" ? color : "#fff"};
`;

export default Icon3
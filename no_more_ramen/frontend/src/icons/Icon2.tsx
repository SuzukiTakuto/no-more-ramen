import React from 'react';
import styled from 'styled-components';

type Props = {
    color: string,
    userIcon: string,
    setUserIcon: React.Dispatch<React.SetStateAction<string>>
}

const Icon2 = (props: Props) => {
  return (
    <IconContainer  color={props.color} userIcon={props.userIcon} onClick={(e) => {
        e.preventDefault();
        props.setUserIcon("1");
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25.34" height="19.773" viewBox="0 0 25.34 19.773">
        <g id="_i_icon_10447_icon_104470" transform="translate(-0.002 -56.239)">
            <path id="パス_23" data-name="パス 23" d="M24.529,60.242c-.307,0-.615-.123-1.213-.15a10.021,10.021,0,0,0-8.756-3.827A11.675,11.675,0,0,0,7.79,58.6a7.157,7.157,0,0,0-4.573-1.228L4.639,61.4A10.657,10.657,0,0,1,0,63.705l2.021,5.786a33.14,33.14,0,0,0,4.932,2.624l1.452,3.9h3.169V73.63a15.7,15.7,0,0,0,2.985.363,11.851,11.851,0,0,0,3.9-.59v2.61h3.169l2.55-7.421a8.1,8.1,0,0,0,.757-3.463,8.6,8.6,0,0,0-.514-2.968,2.65,2.65,0,0,1,.379-.292C25.768,61.249,25.287,60.242,24.529,60.242Z" fill={props.userIcon === "1" ? "#fff" : props.color} />
        </g>
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
    background-color: ${({color, userIcon}) => userIcon === "1" ? color : "#fff"};
`;

export default Icon2
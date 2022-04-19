import React from 'react';
import styled from 'styled-components';

type Props = {
    color: string,
    userIcon: number,
    setUserIcon: React.Dispatch<React.SetStateAction<number>>
}

const Icon1 = (props: Props) => {
  return (
    <IconContainer color={props.color} userIcon={props.userIcon} onClick={(e) => {
        e.preventDefault();
        props.setUserIcon(0);
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26.312" height="20.595" viewBox="0 0 26.312 20.595">
        <g id="_i_icon_11334_icon_113340" transform="translate(0 -55.625)">
            <path id="パス_21" data-name="パス 21" d="M13.156,55.625C5.891,55.625,0,57.993,0,60.913a13.159,13.159,0,0,0,7.868,12.05v1.131c0,1.174,2.367,2.126,5.288,2.126s5.288-.952,5.288-2.126V72.963a13.16,13.16,0,0,0,7.868-12.05C26.312,57.993,20.421,55.625,13.156,55.625Zm8.5,7.034a23.989,23.989,0,0,1-8.5,1.393,23.993,23.993,0,0,1-8.5-1.393c-2.044-.822-2.505-1.631-2.505-1.746s.462-.923,2.505-1.744a23.955,23.955,0,0,1,8.5-1.395,23.951,23.951,0,0,1,8.5,1.395c2.044.821,2.505,1.63,2.505,1.744S23.7,61.837,21.657,62.659Z" transform="translate(0 0)" fill={props.userIcon === 0 ? "#fff" : props.color} />
        </g>
        </svg>
    </IconContainer>
  )
}

const IconContainer = styled.button<{color: string, userIcon: number}>`
    border: none;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({color, userIcon}) => userIcon === 0 ? color : "#fff"};
`;

export default Icon1
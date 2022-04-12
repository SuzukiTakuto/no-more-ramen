import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { RankItem } from '../type/type';

type Props = RankItem & {
    bgcolor?: string
}

const RankingItem = (props: Props) => {
  const [color, setColor] = useState("#2BAD62");

  useEffect(() => {
      console.log("read");
      switch (true) {
        case props.calorie_per_month > 6000:
            setColor('#FFC400');
            break;
        case props.calorie_per_month > 15000:
            setColor("#E0470E");
            break;
    }
  }, []);
  

  return (
    <ItemContainer color={color} bgColor={props.bgcolor}>
        <RankIcon>
            <Rank>{props.rank}</Rank>
            <Icon color={color}>
                {props.icon_id === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.312" height="20.595" viewBox="0 0 26.312 20.595">
                    <g id="_i_icon_11334_icon_113340" transform="translate(0 -55.625)">
                        <path id="パス_21" data-name="パス 21" d="M13.156,55.625C5.891,55.625,0,57.993,0,60.913a13.159,13.159,0,0,0,7.868,12.05v1.131c0,1.174,2.367,2.126,5.288,2.126s5.288-.952,5.288-2.126V72.963a13.16,13.16,0,0,0,7.868-12.05C26.312,57.993,20.421,55.625,13.156,55.625Zm8.5,7.034a23.989,23.989,0,0,1-8.5,1.393,23.993,23.993,0,0,1-8.5-1.393c-2.044-.822-2.505-1.631-2.505-1.746s.462-.923,2.505-1.744a23.955,23.955,0,0,1,8.5-1.395,23.951,23.951,0,0,1,8.5,1.395c2.044.821,2.505,1.63,2.505,1.744S23.7,61.837,21.657,62.659Z" transform="translate(0 0)" fill="#fff" />
                    </g>
                    </svg>
                ) : props.icon_id === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="25.34" height="19.773" viewBox="0 0 25.34 19.773">
                    <g id="_i_icon_10447_icon_104470" transform="translate(-0.002 -56.239)">
                        <path id="パス_23" data-name="パス 23" d="M24.529,60.242c-.307,0-.615-.123-1.213-.15a10.021,10.021,0,0,0-8.756-3.827A11.675,11.675,0,0,0,7.79,58.6a7.157,7.157,0,0,0-4.573-1.228L4.639,61.4A10.657,10.657,0,0,1,0,63.705l2.021,5.786a33.14,33.14,0,0,0,4.932,2.624l1.452,3.9h3.169V73.63a15.7,15.7,0,0,0,2.985.363,11.851,11.851,0,0,0,3.9-.59v2.61h3.169l2.55-7.421a8.1,8.1,0,0,0,.757-3.463,8.6,8.6,0,0,0-.514-2.968,2.65,2.65,0,0,1,.379-.292C25.768,61.249,25.287,60.242,24.529,60.242Z" fill="#fff" />
                    </g>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18">
                    <text id="マシ_マシ" data-name="マシ
                    マシ" transform="translate(0 7)" fill="#fff" font-size="8" font-family="HiraKakuProN-W6, Hiragino Kaku Gothic ProN"><tspan x="0" y="0">マシ</tspan><tspan x="0" y="10">マシ</tspan></text>
                    </svg>
                )}
            </Icon>
        </RankIcon>
        
        
        <Username>{props.username}</Username>
        <Score color={color}>{props.calorie_per_month}</Score>
    </ItemContainer>
  )
}

const ItemContainer = styled.div<{color: string, bgColor?: string}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 298px;
    margin: 0 auto 16px;
    background-color: ${({bgColor}) => bgColor ? bgColor : "#fff"};
`;

const Rank = styled.p`
    font-size: 16px;
    font-weigth: 600;
    color: #4B4B4B;
`;

const Icon = styled.div<{color: string}>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({color}) => color};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Username = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #4B4B4B;
`;

const Score = styled.p<{color: string}>`
    color: ${({color}) => color};
`;

const RankIcon = styled.div`
    width: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default RankingItem
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

type Props = {
    color: string;
    text: string;
}

const Footer = (props: Props) => {
  const history = useHistory();

  

  return (
    <FooterContainer>
        <IconContainer>
            <Icon>
                <div onClick={() => history.push("/ramen_record")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                        <g id="グループ_3" data-name="グループ 3" transform="translate(-11 -552)">
                            <circle id="楕円形_1" data-name="楕円形 1" cx="18" cy="18" r="18" transform="translate(11 552)" fill={props.color}/>
                            <g id="_i_icon_11334_icon_113340" transform="translate(18.075 561.449)">
                            <path id="パス_4" data-name="パス 4" d="M10.925,55.625C4.892,55.625,0,57.591,0,60.016A10.927,10.927,0,0,0,6.533,70.022v.939c0,.975,1.966,1.766,4.391,1.766s4.391-.791,4.391-1.766v-.939a10.928,10.928,0,0,0,6.533-10.006C21.849,57.591,16.958,55.625,10.925,55.625Zm7.059,5.841a19.92,19.92,0,0,1-7.059,1.157,19.924,19.924,0,0,1-7.059-1.157c-1.7-.683-2.08-1.354-2.08-1.45s.383-.767,2.08-1.448a19.892,19.892,0,0,1,7.059-1.158,19.888,19.888,0,0,1,7.059,1.158c1.7.681,2.08,1.354,2.08,1.448S19.681,60.783,17.984,61.466Z" transform="translate(0 -55.625)" fill="#fff"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </Icon>
            <IconText color={props.color}>{props.text}</IconText>
        </IconContainer>
        
        <IconContainer>
            <Icon>
                <div>
                   <svg id="_i_icon_01789_icon_017890" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                        <path id="パス_1" data-name="パス 1" d="M18,0A18,18,0,1,0,36,18,18,18,0,0,0,18,0Zm.41,15.659h.012a3.759,3.759,0,0,1-.1-.878,3.852,3.852,0,0,1,6.666-2.633,7.692,7.692,0,0,0,2.035-.716c.137-.068.274-.136.407-.212a3.842,3.842,0,0,1-1.235,1.791,3.578,3.578,0,0,1-.455.318l.021,0c-.007,0-.013.01-.02.014a7.653,7.653,0,0,0,1.808-.442c.131-.046.263-.094.393-.146a7.8,7.8,0,0,1-1.914,1.978c.011.169.011.332.011.5A10.956,10.956,0,0,1,9.169,24.463a8.274,8.274,0,0,0,.923.056,7.7,7.7,0,0,0,3.636-.91c.023-.012.047-.023.07-.035.069-.038.135-.081.2-.12a8.062,8.062,0,0,0,.872-.577h-.013l.014-.01A3.809,3.809,0,0,1,11.28,20.2a3.709,3.709,0,0,0,1.46-.012c.091-.015.184-.026.274-.045l-.021-.006.023,0a3.856,3.856,0,0,1-3.094-3.78V16.3a3.857,3.857,0,0,0,1.347.442c.131.02.263.037.4.045l-.015-.011.021,0a3.827,3.827,0,0,1-1.317-4.892c.042-.082.079-.166.128-.245A10.918,10.918,0,0,0,18.3,15.651c.037,0,.074.01.112.012Z" fill={props.color}/>
                    </svg> 
                </div>
            </Icon>
            <IconText color={props.color}>シェアしよう</IconText>
        </IconContainer>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
    width: 192px;
    margin: 55px auto 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding-bottom: 37.758px;
`;

const IconContainer = styled.div`
    width: 72px;
`;

const IconText = styled.p<{color: string}>`
    font-size: 12px;
    color: ${ ({ color }) => color };
    padding-top: 8px;
`;

const Icon = styled.div`
    width: 36px;
    margin: 0 auto;
    cursor: pointer;
`;

export default Footer
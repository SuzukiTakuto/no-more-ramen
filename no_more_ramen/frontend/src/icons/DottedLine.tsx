import React from 'react';
import styled from 'styled-components';

const DottedLine = () => {
  return (
    <IconContainer>
        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20">
        <g id="グループ_28" data-name="グループ 28" transform="translate(-186 -1195)">
            <circle id="楕円形_70" data-name="楕円形 70" cx="2" cy="2" r="2" transform="translate(186 1195)" fill="#4b4b4b"/>
            <circle id="楕円形_71" data-name="楕円形 71" cx="2" cy="2" r="2" transform="translate(186 1203)" fill="#4b4b4b"/>
            <circle id="楕円形_72" data-name="楕円形 72" cx="2" cy="2" r="2" transform="translate(186 1211)" fill="#4b4b4b"/>
            <circle id="楕円形_73" data-name="楕円形 73" cx="2" cy="2" r="2" transform="translate(186 1195)" fill="#4b4b4b"/>
            <circle id="楕円形_74" data-name="楕円形 74" cx="2" cy="2" r="2" transform="translate(186 1203)" fill="#4b4b4b"/>
            <circle id="楕円形_75" data-name="楕円形 75" cx="2" cy="2" r="2" transform="translate(186 1211)" fill="#4b4b4b"/>
        </g>
        </svg>
    </IconContainer>
  )
}

const IconContainer = styled.div`
    width: 4px;
    height: 20px;
    margin: 24px auto 34px;
`;

export default DottedLine;
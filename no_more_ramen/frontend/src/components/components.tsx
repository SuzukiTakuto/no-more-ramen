import styled from "styled-components";

export const Message = styled.div`
    width: 300px;
    margin: 17.7px auto 8px;
    text-align: center;
    line-height: 1.6;
`;

type ButtonProps = {
    bgColor: string;
    color: string;
    stroke: string;
    mt?: string;
    onClick?: any;
}

export const Button = styled.button<ButtonProps>`
    display: block;
    width: 120px;
    height: 30px;
    border: ${ ({ stroke }) => stroke };
    border-radius: 100px;
    color: ${ ({ color }) => color };
    margin: ${({ mt }) => mt ? mt : "8px auto;"}
    cursor: pointer;
    background-color: ${ ({ bgColor }) => bgColor };
`;

export const Form = styled.div<{login?: boolean}>`
    width: 230px;
    margin: ${({login}) => login ? "100px auto 0;" : "50px auto 0;"}
    padding-bottom: 141.117px;
`;

export const Input = styled.div<{mb?: number, color?: string}>`
    margin: 10px 0 ;
    > input {
        width: 100%;
        height: 35px;
        border: 1px solid ${({color}) => color ? color : "#2BAD62"};
        border-radius: 10px;
        padding-left: 10px;
        margin: 5px 0 ${ ({ mb }) => mb ? mb : 0 }px;
    }
`;

export const NoodleIcon = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto 10px;
`;

export const MaleIcon = styled.div<{select: boolean, color?: string}>`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({select, color}) => select? (
        `border-radius: 50%; background-color: ${color};`
    ) : (
        "border-radius: 0; background-color: #fff;"
    )}
`;

export const FamaleIcon = styled.div<{select: boolean, color?: string}>`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({select, color}) => select ? (
        `border-radius: 50%; background-color: ${color};`
    ) : (
        "border-radius: 0; background-color: #fff;"
    )}
`;
export const OtherIcon = styled.div<{select: boolean, color?: string}>`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({select, color}) => select ? (
        `border-radius: 50%; background-color: ${color};`
    ) : (
        "border-radius: 0; background-color: #fff;"
    )}
`;

export const BackIcon = styled.button`
    position: absolute;
    top: 44.7px;
    left: 29.5px;
    border: none;
    background-color: #fff;
    cursor: pointer;
`;

export const QuestionText = styled.p`
    display: block;
    width: 105px;
    font-size: 12px;
    color: #4B4B4B;
    text-align: right;
`;
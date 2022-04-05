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
    onClick?: any;
}

export const Button = styled.button<ButtonProps>`
    display: block;
    width: 120px;
    height: 30px;
    border: ${ ({ stroke }) => stroke };
    border-radius: 100px;
    color: ${ ({ color }) => color };
    margin: 8px auto;
    cursor: pointer;
    background-color: ${ ({ bgColor }) => bgColor };
`;

export const Form = styled.div<{login?: boolean}>`
    width: 230px;
    margin: 50px auto 0;
    margin: ${(login) => login ? "100px auto 0;" : "50px auto 0;"}
    padding-bottom: 141.117px;
`;

export const Input = styled.div<{mb?: number}>`
    margin: 10px 0 ;
    > input {
        width: 100%;
        height: 35px;
        border: 1px solid #222;
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
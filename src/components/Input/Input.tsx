import { type } from 'os';
import React from 'react'
import styled from 'styled-components'

const InputBlock = styled.div`
    width:75%;
    padding:0 15%;
    text-align:left;
    display:flex;  
    justify-content:space-between;
    align-items:baseline;
    margin-bottom: 4vh;
`;
const Label = styled.p`
    ::after{
        content:'*';
        color:red;
    }
    color: #515358;
    font:20px;
`
const InputBar = styled.input`
    width: 420px;
    height: 35px;
    border-radius: 4px;
    border: 0.2px solid silver;
`;

interface InputProps{
    label:string;
    typeinput:string;
}


export const Input :React.FC<InputProps> =({label,typeinput}) => {
  return (
    <InputBlock>
        <Label>{label}</Label>
        <InputBar type={typeinput}/>
    </InputBlock>
  )
}

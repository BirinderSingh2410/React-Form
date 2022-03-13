import { type } from 'os';
import React from 'react'
import styled from 'styled-components'
import {MdOutlineAttachFile} from 'react-icons/md'

const InputBlock = styled.div`
    width:75%;
    text-align:left;
    display:flex;  
    justify-content:space-between;
    align-items:baseline;
    margin:auto;
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
    width: 500px;
    height: 45px;
    border-radius: 4px;
    margin-right:10%;
    border: 0.2px solid silver
`;
const UploadResume = styled.button`
    width: 280px;
    height: 45px;
    margin-right:10%;
    border-radius: 4px;
    border: 0.2px solid silver;
    background-color:#EFEFEF;
    margin:auto;
    .pin-icon{
        font-size:17px;
    }
    :hover
    {
        cursor:pointer;
    }
`;

interface InputProps{
    label:string;
    typeinput:string;
}


export const Input :React.FC<InputProps> =({label,typeinput}) => {
  return (
    <InputBlock>
        <Label>{label}</Label>
        {typeinput === "submit" ? <UploadResume><MdOutlineAttachFile className='pin-icon'/>ATTACH RESUME/CV</UploadResume> : <InputBar type={typeinput}/>}
    </InputBlock>
  )
}

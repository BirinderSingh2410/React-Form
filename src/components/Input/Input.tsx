import { type } from 'os';
import React from 'react'
import styled from 'styled-components'
import {MdOutlineAttachFile} from 'react-icons/md'
import { useForm, UseFormProps } from 'react-hook-form';

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
    color: #515358;
    font:20px;
`
const RequiredLabel = styled.p`
    ::after{
        content:'*';
        color:red;
    }
    color: #515358;
    font:20px;
`
const InputTextBlock = styled.div`
    display:flex;
    flex-direction:column;
`
const InputBar = styled.input`
    width: 500px;
    height: 45px;
    border-radius: 4px;
    margin-right:10%;
    border: 0.2px solid silver
`;
const UploadResume = styled.input`
    width: 280px;
    height: 45px;
    margin-right:10%;
    border-radius: 4px;
    border: 0.2px solid silver;
    background-color:#EFEFEF;
    margin:auto;
    text-align:center;
`;

interface InputProps{
    label:string,
    typeinput:string,
    register:any,
    required:boolean,
    error:any,
    errormessage:string 
}


export const Input :React.FC<InputProps> =({label,typeinput,register,required,errormessage,error}) => {
    return (
    <InputBlock>
        {required ? <RequiredLabel>{label}</RequiredLabel> : <Label>{label}</Label>}
        {typeinput === "file" ? <UploadResume type={typeinput}/> : <InputTextBlock><InputBar type={typeinput} {...register}/>{error ? <small style={{color:"red"}}>{errormessage}</small>:null}</InputTextBlock>}
    </InputBlock>
  )
}

import { type } from 'os';
import React from 'react'
import styled from 'styled-components'
import {MdOutlineAttachFile} from 'react-icons/md'
import { useForm, UseFormProps } from 'react-hook-form';

const InputBlock = styled.div`
    width:100%;
    text-align:left;
    display:flex;  
    justify-content:space-between;
    margin-bottom: 4vh;
    div{
        width:70%;
    }
    @media (max-width: 800px){
        flex-direction:column;
        div{
            width:95%;
        }
    }
`;
const Label = styled.p`
    color: #515358;
    font:20px;

    @media(max-width:800px){
        margin-bottom:2vh;
    }
`
const RequiredLabel = styled.p`
    ::after{
        content:'*';
        color:red;
    }
    color: #515358;
    font:20px;
    
    @media(max-width:800px){
        margin-bottom:2vh;
    }
`
const InputTextBlock = styled.div`
    display:flex;
    flex-direction:column;
`
const InputBar = styled.input`
    width: 99%;
    height: 40px;
    border-radius: 4px;
    border: 0.2px solid silver;
    font-size:18px;
`;
const UploadResume = styled.input`
    width: 180px;
    height: 45px;
    border-radius: 4px;
    border: 0.2px solid silver;
    background-color:#EFEFEF;
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
        <div>
            {typeinput === "file" ? <UploadResume type={typeinput}/> : <InputTextBlock><InputBar type={typeinput} {...register}/>{error ? <small style={{color:"red"}}>{errormessage}</small>:null}</InputTextBlock>}
        </div>
    </InputBlock>
  )
}

import { type } from 'os';
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { MdOutlineAttachFile } from 'react-icons/md'
import PhoneInput from 'react-phone-number-input';




const InputBlock = styled.div`
    width:100%;
    text-align:left;
    display:flex;  
    justify-content:space-between;
    margin-bottom: 4vh;
    div{
        width:70%;
        .phoneinput{
            width:99%;
            display:flex;
            select{
                width:100%;
                height:40px;
                border-radius: 4px;
                border: 0.2px solid silver;
                font-size:10px;
            }
            .PhoneInputCountry{
                width:10%;
            }
            .PhoneInputCountryIcon
            {
                width:20px;
            }
            input{
                width: 90%;
                height: 40px;
                border-radius: 4px;
                border: 0.2px solid silver;
                font-size:18px;
            }
        }
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
const ResumeBlock = styled.div`
    width: 180px;
    height: 45px;
.custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content:'ATTACH RESUME/CV';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding:10px 10px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 15px;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`
const UploadResume = styled.input`
    border-radius: 4px;
    border: 0.2px solid silver;
    background-color:#EFEFEF;
    text-align:center;
    width:169px;
`;


interface InputProps {
    label: string,
    typeinput: string,
    register: any,
    required: boolean,
    error: any,
    errormessage: string
}


export const Input: React.FC<InputProps> = ({ label, typeinput, register, required, errormessage, error }) => {

    const [resumeUploaded, setUploaded] = useState(false);

    
    
    return (
        <InputBlock>
            {required ? <RequiredLabel>{label}</RequiredLabel> : <Label>{label}</Label>}
            <div>
                {
                    typeinput === "file" ? <div><ResumeBlock><UploadResume type={typeinput} className="custom-file-input"  accept="application/pdf" /></ResumeBlock>{error ? <small style={{ color: "red" }}>{errormessage}</small> : null}</div> :
                        typeinput === 'tel' ?
                            <div><PhoneInput className='phoneinput' value={null} onChange={null} {...register} />{error ? <small style={{ color: "red" }}>{errormessage}</small> : null}</div> : <InputTextBlock>
                                <InputBar type={typeinput} {...register} />
                                {error ? <small style={{ color: "red" }}>{errormessage}</small> : null}
                            </InputTextBlock>
                }
            </div>
        </InputBlock>
    )
}

import React, { useState } from 'react'
import { Input } from '../Input/Input';
import styled from 'styled-components';
import { SelectionForm } from '../SelectionForm/SelectionForm';
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RaceDropDown } from '../RaceDropDown/RaceDropDown';
import { Path, PathValue, useForm } from 'react-hook-form';
import {addDoc,collection} from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage'



const DetailBlock = styled.form`
    width:100%;
    background-color:#f9f9f9;
    padding-top: 1vh;
`
const DetailInnerBlock = styled.div`
    width:85%;
    margin-left:15%;
    
`
const Captcha = styled.div`
    margin-top:5vh;
    width: 100%;
    text-align: -webkit-center;
         div{
             div{
                 div{
                        overflow-y:hidden;
                    }
                }
        }
`;
const SubmitApplication = styled.h1`
    padding:0 15%;
    font-size:20px;
`
const Resopnse = styled.input`
    width:73%;
    display:flex;
    flex-direction:column;
    height: 35px;
    border-radius: 4px;
    border: 0.2px solid silver;
    font-size:15px;
    padding-left:2vw;

    @media (max-width:800px){
        width:82%;
    }
`;
const CoverLetter = styled.textarea`
    padding-top: 10px;
    width: 74%;
    font-size:16px;
    display:flex;
    flex-direction:column;
    height: 130px;
    padding-left:1vw;
    margin-bottom:2vh;
    border: 0.2px solid silver;

    @media (max-width:800px){
        width:82%;
    }
`
const HorizontalLine = styled.hr`
    width: 75%;
    margin-bottom: 4vh;
    margin-top: 10vh;
    color: #515357;

    @media (max-width:800px){
        width:82%;
    }
`;
const USEmployeeHeading = styled.h1`
    font-size: 17px;
    font-weight: 600;
    color: #515357;
    margin-bottom: 6vh;
    margin-top:15vh;
    ::after{
        margin-left:1vw;
        content:"(Completion is voluntary and will not subject you to adverse treatment)";
        font-weight:400;
        
    }
`;
const SubmitApplicationButton = styled.input`
    background-color: #4f65f1;;
    border-radius:3px;
    border:none;
    color:white;
    height: 40px;
    width: 170px;
    margin-top:4vh;
    font-size: 14px;
    font-weight: 600;
    :hover{
        cursor:pointer;
    }

`
const Headings = styled.h1`
    font-size: 17px;
    font-weight: 600;
    color: #515357;
    margin-top:5vh;
    margin-bottom:5vh;
`
const USEmployeeContent = styled.p`
    width:74%;
    color:#515357;
    font-size:15px;
`;
const InputBar = styled.input`
    width: 500px;
    height: 45px;
    border-radius: 4px;
    margin-right:10%;
    border: 0.2px solid silver
`;
const SubmitButtonBlock = styled.div`
    width:100%;
    text-align: -webkit-center;
` ;
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
`;
const UploadResume = styled.input`
    border-radius: 4px;
    border: 0.2px solid silver;
    background-color:#EFEFEF;
    text-align:center;
    width:169px;
`;


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
`;
const optiontag = [
    ["Select ...", "Male", "Female", "Declinetoself-identify"],
    ["Select ...", "Hispanic or Latino", "White (Not Hispanic or Latino)", "Black or African American (Not Hispanic or Latino)", "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)", "Asian (Not Hispanic or Latino)", "American Indian or Alaska Native (Not Hispanic or Latino)", "Two or More Races (Not Hispanic or Latino)"],
    ["Select ...", "I am a veteran", "I am not a veteran", "Decline to self-identify"]
];

type FormType = {
    fullname: string,
    email: string,
    phone: number,
    currentcompany: string,
    linkedin: string,
    twitter: string,
    portfolio: string,
    github: string,
    other: any,
    gender: string,
    race: string,
    resume:any,
    veteranstatus: string,
    response: string,
    additionalinfo: string
}

export const Details = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormType>();
    const [moredetail, showDetail] = useState(false);
    const [gendervaluechange, setGender] = useState(false);
    const gendervalue = watch('gender');
    const[captcha,setCaptcha] = useState(false);
    const [upload,setUpload] = useState(false);
    const applicantCollection = collection(db , "applicants")

    function dropdown() {
        showDetail(!moredetail);
    }
    
    const newApplicant = async(data:object) =>{

        
        console.log(data)
        await addDoc(applicantCollection,data)
    }
    const storage=getStorage();                                   //getting a storage
    const file = new File([""],"uploaddata");
    const resumeUpload = (e:any) => {
        const file = e.target.files[0];
        const fileLength = e.target.files.length;
        const pdfRef = ref(storage,"Pdf/"+ file.name);//create a referance where you want to store the file.
            uploadBytes(pdfRef, file).then((snapshot) => {
                          //upload file to storage
            getDownloadURL(pdfRef).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                          });
            console.log('Uploaded a blob or file!');
          });

        if(fileLength === 1){
            setUpload(true)
        };
    }

    const FormSubmit = handleSubmit((data) => {
        if(gendervalue != 'Select ...'){
            setGender(false);
        }
        if (gendervalue && captcha && upload) {
            
            newApplicant(data);
            console.log(data);
        }
        else {
            setGender(true);
        }
    })

    return (
        <DetailBlock onSubmit={FormSubmit}>
            <DetailInnerBlock>
                <Headings >SUBMIT YOUR APPLICATION</Headings>
                <InputBlock>
                <RequiredLabel>Resume/CV</RequiredLabel> 
                <ResumeBlock><UploadResume type="file" className="custom-file-input" accept="application/pdf" onChange={resumeUpload}/></ResumeBlock>
                </InputBlock>

                <Input label="Fullname" typeinput="text" error={errors.fullname} required={true} errormessage="Minimum 10 characters required" register={{ ...register('fullname', { required: true, minLength: 10 }) }} />

                <Input label="Email" errormessage="This Field is Required" error={errors.email} required={true}typeinput="type"  register={{ ...register('email', { required: true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }) }} />

                <Input label="Phone" required={false} errormessage="Enter the valid Phone Number" typeinput='tel' error={errors.phone}  register={{ ...register('phone',{pattern:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,maxLength:15}) }} />

                <Input label="Current Company" required={false} errormessage="" error={null} typeinput="text"  register={{ ...register('currentcompany') }} />

                <Headings>LINKS</Headings>


                <Input label="LinkedIn URL" errormessage="Enter the valid URL" required={false} typeinput='text' error={errors.linkedin}  register={{ ...register('linkedin', { pattern:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,minLength:5 }) }} />

                <Input label="Twitter URL" required={false} typeinput="text" errormessage="Enter the valid URL" error={null}  register={{ ...register('twitter',{minLength:7,pattern:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/},) }} />

                <Input label="GitHub URL" required={false} typeinput="text" errormessage="" error={null} register={{ ...register('github') }} />

                <Input required={false} label="Portfolio URL" typeinput='text' errormessage="Enter the valid URL" error={null}  register={{ ...register('portfolio',{pattern:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,minLength:7}) }} />

                <Input required={false} label="Other Website" typeinput="text" errormessage="Enter the valid URL" error={null}  register={{ ...register('other',{pattern:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,minLength:7}) }} />

                <Headings>PREFERRED PRONOUNS</Headings>
                <Resopnse placeholder='Type your response' {...register('response', { maxLength:20 })} />
                {errors.response ? <small style={{ color: "red" }}>MAX 20 Characters Allowed</small> : null}

                <Headings >ADDITIONAL INFORMATION</Headings>
                <CoverLetter placeholder='Add a cover letter or anything else you want to share.' {...register('additionalinfo', { minLength: 30 })} />
                {errors.additionalinfo && (<small style={{ color: "red"}}>Minimum 50 characters Required</small>)}
                <HorizontalLine />

                <USEmployeeHeading>U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION</USEmployeeHeading>
                <USEmployeeContent>
                    Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in a confidential survey at the end of this application. Providing this information is optional. It will not be accessible or used in the hiring process, and has no effect on your opportunity for employment.
                </USEmployeeContent>

                <SelectionForm Icon={null} selectionlabel='Gender' rightoption={gendervaluechange} option={optiontag[0]} register={{ ...register('gender', { required: true, }) }} />

                <SelectionForm Icon={<AiOutlineExclamationCircle onClick={dropdown} />} rightoption={false} selectionlabel='Race' option={optiontag[1]} register={{ ...register('race', { required: true }) }} />
                {moredetail ? <RaceDropDown /> : null}

                <SelectionForm Icon={null} selectionlabel='Veteran Status' rightoption={false} option={optiontag[2]} register={{ ...register('veteranstatus', { required: true }) }} />

                <Captcha>
                    <ReCAPTCHA sitekey="6Le1kc8eAAAAAOuMLNQ9MfWQcymXd8rV5dGDRdaE" onChange={()=>{setCaptcha(true)}}/>
                    {captcha ? null:<small style={{color:"red"}}>Verification Required</small>}
                </Captcha>

                <SubmitButtonBlock><SubmitApplicationButton type="submit" value="Submit Application" /></SubmitButtonBlock>
            </DetailInnerBlock>
        </DetailBlock>
    )
}

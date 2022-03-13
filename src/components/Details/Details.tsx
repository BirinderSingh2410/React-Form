import React,{useState} from 'react'
import { Input } from '../Input/Input';
import styled from 'styled-components';
import { SelectionForm } from '../SelectionForm/SelectionForm';
import { JobPowered } from '../JobPowered/JobPowered';
import ReCAPTCHA from "react-google-recaptcha";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import { RaceDropDown } from '../RaceDropDown/RaceDropDown';
import { useForm } from 'react-hook-form';


const DetailBlock = styled.form`
    width:100%;
    background-color:#f9f9f9;
    padding-top: 1vh;

`

const Captcha=styled.div`
    margin-top:5vh;
    .recaptcha{
        margin-left:34%;
        div > div{
            height:100px;
        }
    }
`;
const SubmitApplication = styled.h1`
    padding:0 15%;
    font-size:20px;
`
const Resopnse = styled.input`
    width:73%;
    height: 35px;
    border-radius: 4px;
    border: 0.2px solid silver;
    margin:0 12.5%;
    font-size:15px;
    padding-left:2vw;
`;
const CoverLetter = styled.textarea`
    padding-top: 10px;
    width: 77%;
    margin: 0 12.5%;
    font-size:16px;
    height: 130px;
    padding-left:1vw;
    margin-bottom:2vh;
    border: 0.2px solid silver;
`
const HorizontalLine = styled.hr`
    width: 75%;
    margin-bottom: 4vh;
    margin-left: 15%;
    margin-top: 10vh;
    color: #515357;
`;
const USEmployeeHeading = styled.h1`
    padding:0 12.5%;
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
const SubmitApplicationButton = styled.button`
    background-color: #4f65f1;;
    border-radius:3px;
    border:none;
    color:white;
    height: 40px;
    width: 170px;
    margin-top:4vh;
    margin-left:40%;
    font-size: 14px;
    font-weight: 600;
    :hover{
        cursor:pointer;
    }

`
const Headings = styled.h1`
    margin-left:12.5vw;
    font-size: 17px;
    font-weight: 600;
    color: #515357;
    margin-top:5vh;
    margin-bottom:5vh;
`
const USEmployeeContent = styled.p`
    width:74%;
    color:#515357;
    margin:0 12.5%;
    font-size:15px;
`;
const optiontag=[
    ["Select ...","Male","Female","Declinetoself-identify"],
    ["Select ...","Hispanic or Latino","White (Not Hispanic or Latino)","Black or African American (Not Hispanic or Latino)","Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)","Asian (Not Hispanic or Latino)","American Indian or Alaska Native (Not Hispanic or Latino)","Two or More Races (Not Hispanic or Latino)"],
    ["Select ...","I am a veteran","I am not a veteran","Decline to self-identify"]
];

export const Details = () => {
    const[moredetail,showDetail] = useState(false);

    function dropdown(){
        showDetail(!moredetail);
    }

    return (
        <DetailBlock>
            <Headings >SUBMIT YOUR APPLICATION</Headings>
            <Input label="Resume/CV" typeinput='submit' />
            <Input label="Fullname" typeinput="text" />
            <Input label="Email" typeinput="text" />
            <Input label="Phone" typeinput='text' />
            <Input label="Current Company" typeinput="text" />

            <Headings>LINKS</Headings>
            <Input label="LinkedIn URL" typeinput='text' />
            <Input label="Twitter URL" typeinput="text" />
            <Input label="GitHub URL" typeinput="text" />
            <Input label="Portfolio URL" typeinput='text' />
            <Input label="Other Website" typeinput="text" />

            <Headings>PREFERRED PRONOUNS</Headings>
            <Resopnse placeholder='Type your response' />

            <Headings >ADDITIONAL INFORMATION</Headings>
            <CoverLetter placeholder='Add a cover letter or anything else you want to share.' />

            <HorizontalLine />

            <USEmployeeHeading>U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION</USEmployeeHeading>
            <USEmployeeContent>
                Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in a confidential survey at the end of this application. Providing this information is optional. It will not be accessible or used in the hiring process, and has no effect on your opportunity for employment.
            </USEmployeeContent>

            <SelectionForm Icon={null} selectionlabel='Gender' option={optiontag[0]}/>
            <SelectionForm Icon={<AiOutlineExclamationCircle onClick={dropdown} />} selectionlabel='Race'  option={optiontag[1]}/>
            {moredetail ? <RaceDropDown/> : null}
            <SelectionForm Icon={null} selectionlabel='Veteran Status' option={optiontag[2]}/>

            <Captcha>
                <ReCAPTCHA  className='recaptcha' sitekey="6Le1kc8eAAAAAOuMLNQ9MfWQcymXd8rV5dGDRdaE"/>
            </Captcha>

            <SubmitApplicationButton>SUBMIT APPLICATION</SubmitApplicationButton>

            <JobPowered/>
        </DetailBlock>
    )
}

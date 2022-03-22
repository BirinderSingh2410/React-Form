import React, { useState, useEffect } from "react";
import { Input } from "../Input/Input";
import styled from "styled-components";
import { SelectionForm } from "../SelectionForm/SelectionForm";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RaceDropDown } from "../RaceDropDown/RaceDropDown";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { MdAttachFile } from "react-icons/md";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";

const DetailBlock = styled.form`
  width: 100%;
  background-color: #f9f9f9;
  padding-top: 1vh;
`;
const DataBlock = styled.div`
  width: 85%;
  margin-left: 15%;
`;
const Captcha = styled.div`
  margin-top: 5vh;
  width: 100%;
  text-align: -webkit-center;
  div {
    div {
      div {
        overflow-y: hidden;
      }
    }
  }
`;
const SubmitApplication = styled.h1`
  padding: 0 15%;
  font-size: 20px;
`;
const Resopnse = styled.input`
  width: 76%;
  display: flex;
  flex-direction: column;
  height: 35px;
  border-radius: 4px;
  border: 0.2px solid silver;
  font-size: 15px;
  padding-left: 2vw;

  @media (max-width: 800px) {
    width: 82%;
  }
`;
const CoverLetter = styled.textarea`
  padding-top: 10px;
  width: 77%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  height: 130px;
  padding-left: 1vw;
  margin-bottom: 2vh;
  border: 0.2px solid silver;

  @media (max-width: 800px) {
    width: 82%;
  }
`;
const HorizontalLine = styled.hr`
  width: 75%;
  margin-bottom: 4vh;
  margin-top: 10vh;
  color: #515357;

  @media (max-width: 800px) {
    width: 82%;
  }
`;
const USEmployeeHeading = styled.h1`
  font-size: 17px;
  font-weight: 600;
  color: #515357;
  margin-bottom: 6vh;
  margin-top: 15vh;
  ::after {
    margin-left: 1vw;
    content: "(Completion is voluntary and will not subject you to adverse treatment)";
    font-weight: 400;
  }
`;
const SubmitApplicationButton = styled.input`
  background-color: #4f65f1;
  border-radius: 3px;
  border: none;
  color: white;
  height: 40px;
  width: 190px;
  margin-top: 4vh;
  font-size: 14px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;
const Headings = styled.h1`
  font-size: 17px;
  font-weight: 600;
  color: #515357;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;
const USEmployeeContent = styled.p`
  width: 74%;
  color: #515357;
  font-size: 15px;
`;
const InputBar = styled.input`
  width: 500px;
  height: 45px;
  border-radius: 4px;
  margin-right: 10%;
  border: 0.2px solid silver;
`;
const SubmitButtonBlock = styled.div`
  width: 100%;
  text-align: -webkit-center;
`;
const ResumeBlock = styled.div`
  width: 70%;
  height: 45px;
  div {
    width: 180px;
    background-color: #efefef;
    border: 0.2px solid silver;
    border-radius: 3px;
    .upload-error{
        position:absolute;
        margin-left:10px;
        margin-top:10px;
    }
  }
  .attach-logo {
    font-size: 20px;
    position: absolute;
    margin-top: 8px;
  }
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: "ATTACH RESUME/CV";
    display: inline-block;
    border-radius: 3px;
    padding: 10px 30px;
    width: 100%;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
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
  text-align: center;
  width: 180px;
`;

const InputBlock = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4vh;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
const RequiredLabel = styled.p`
  ::after {
    content: "*";
    color: red;
  }
  color: #515358;
  font: 20px;

  @media (max-width: 800px) {
    margin-bottom: 2vh;
  }
`;
const optiontag = [
  ["Select ...", "Male", "Female", "Declinetoself-identify"],
  [
    "Select ...",
    "Hispanic or Latino",
    "White (Not Hispanic or Latino)",
    "Black or African American (Not Hispanic or Latino)",
    "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
    "Asian (Not Hispanic or Latino)",
    "American Indian or Alaska Native (Not Hispanic or Latino)",
    "Two or More Races (Not Hispanic or Latino)",
  ],
  [
    "Select ...",
    "I am a veteran",
    "I am not a veteran",
    "Decline to self-identify",
  ],
];

type FormType = {
  fullname: string;
  email: string;
  phone: number;
  currentcompany: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
  github: string;
  downloadUrl: string;
  other: any;
  gender: string;
  race: string;
  resume: any;
  veteranstatus: string;
  response: string;
  additionalinfo: string;
};

export const Details = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormType>();
  const [moredetail, showDetail] = useState(false);
  const gendervalue = watch("gender");
  const [filesize, setFileSize] = useState(false);
  const [upload, setUpload] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [gender, setGender] = useState(true);
  const applicantCollection = collection(db, "applicants");
  let gendervaluechange = true;

  function dropdown() {
    //Race dropdown i button
    showDetail(!moredetail);
  }

  const newApplicant = async (data: object) => {
    await addDoc(applicantCollection, data);
  };

  const storage = getStorage(); //Storage for firebase
  const uploadResume = (data: { [x: string]: any }) => {
    const storageRef = ref(storage, "resume/" + data.resume[0].name);
        const uploadTask = uploadBytesResumable(storageRef, data.resume[0]);
    
       console.log("uploaded");
       const uploadUrl=()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {                 
                  data.resume = downloadURL.toString();
                  newApplicant(data);
              })
              setTimeout(()=>{alert("Data is saved");window.location.reload()},1000)
          }
          setTimeout(uploadUrl,1000);
  };

  
  function uploadStatus(e: any){
    //file upload validation
    setUpload(true);
    if (e.target.files[0].size > 25000000) {
      setFileSize(true);
    }
  }

  const FormSubmit = handleSubmit((data) => {
    //Form HandleSubmit Function

    if (gendervalue != "Select ...") {
      gendervaluechange = true;
      setGender(true);
    } else {
      gendervaluechange = false;
      setGender(false);
    }

    if (captcha && !filesize && gendervaluechange) {
      uploadResume(data);
    }
  });

  return (
    <DetailBlock onSubmit={FormSubmit}>
      <DataBlock>
        <Headings>SUBMIT YOUR APPLICATION</Headings>
        <InputBlock>
          <RequiredLabel>Resume/CV</RequiredLabel>
          <ResumeBlock>
            <div>
              <MdAttachFile className="attach-logo" />
              <UploadResume
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                {...register("resume", { required: true })}
                onChange={uploadStatus}
              />

              {!upload && errors.resume ? (
                <small className="upload-error" style={{ color: "red" }}> Upload resume!</small>
              ) : null}
              {upload && !filesize ? (
                <small className="upload-error" style={{ color: "#515358" }}> Resume Uploaded!!</small>
              ) : null}
              {filesize ? (
                <small className="upload-error" style={{ color: "red" }}>File Size exceeding 5KB</small>
              ) : null}
            </div>
          </ResumeBlock>
        </InputBlock>

        <Input
          label="Fullname"
          typeinput="text"
          error={errors.fullname}
          required={true}
          errormessage="Minimum 10 characters required"
          register={{
            ...register("fullname", { required: true, minLength: 10 }),
          }}
        />

        <Input
          label="Email"
          errormessage="This Field is Required"
          error={errors.email}
          required={true}
          typeinput="email"
          register={{ ...register("email", { required: true }) }}
        />

        <Input
          label="Phone"
          required={false}
          errormessage="Enter the valid Phone Number"
          typeinput="tel"
          error={errors.phone}
          register={{
            ...register("phone", {
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
              maxLength: 15,
            }),
          }}
        />

        <Input
          label="Current Company"
          required={false}
          errormessage=""
          error={null}
          typeinput="text"
          register={{ ...register("currentcompany") }}
        />

        <Headings>LINKS</Headings>

        <Input
          label="LinkedIn URL"
          errormessage="Enter the valid URL"
          required={false}
          typeinput="text"
          error={errors.linkedin}
          register={{
            ...register("linkedin", {
              pattern:
                /http(s?):|[a-zA-Z0-9\-]+\.|[linkedin][linkedin/~\-]+\.[a-zA-Z0-9/~\-_,&=\?\.;]+[^\.,\s<]/,
              minLength: 5,
            }),
          }}
        />

        <Input
          label="Twitter URL"
          required={false}
          typeinput="text"
          errormessage="Enter the valid URL"
          error={null}
          register={{
            ...register("twitter", {
              minLength: 7,
              pattern: /^@[A-Za-z0-9_]{1,15}$/,
            }),
          }}
        />

        <Input
          label="GitHub URL"
          required={false}
          typeinput="text"
          errormessage=""
          error={null}
          register={{ ...register("github") }}
        />

        <Input
          required={false}
          label="Portfolio URL"
          typeinput="text"
          errormessage="Enter the valid URL"
          error={null}
          register={{ ...register("portfolio", { minLength: 7 }) }}
        />

        <Input
          required={false}
          label="Other Website"
          typeinput="text"
          errormessage="Enter the valid URL"
          error={null}
          register={{
            ...register("other", {
              pattern:
                /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
              minLength: 7,
            }),
          }}
        />

        <Headings>PREFERRED PRONOUNS</Headings>
        <Resopnse
          placeholder="Type your response"
          {...register("response", { maxLength: 20 })}
        />
        {errors.response ? (
          <small style={{ color: "red" }}>MAX 20 Characters Allowed</small>
        ) : null}

        <Headings>ADDITIONAL INFORMATION</Headings>
        <CoverLetter
          placeholder="Add a cover letter or anything else you want to share."
          {...register("additionalinfo", { minLength: 30 })}
        />
        {errors.additionalinfo && (
          <small style={{ color: "red" }}>Minimum 50 characters Required</small>
        )}
        <HorizontalLine />

        <USEmployeeHeading>
          U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION
        </USEmployeeHeading>
        <USEmployeeContent>
          Our company values diversity. To ensure that we comply with reporting
          requirements and to learn more about how we can increase diversity in
          our candidate pool, we invite you to voluntarily provide demographic
          information in a confidential survey at the end of this application.
          Providing this information is optional. It will not be accessible or
          used in the hiring process, and has no effect on your opportunity for
          employment.
        </USEmployeeContent>

        <SelectionForm
          Icon={null}
          selectionlabel="Gender"
          rightoption={gender}
          option={optiontag[0]}
          register={{ ...register("gender", { required: true }) }}
        />

        <SelectionForm
          Icon={<AiOutlineExclamationCircle onClick={dropdown} />}
          rightoption={false}
          selectionlabel="Race"
          option={optiontag[1]}
          register={{ ...register("race", { required: true }) }}
        />
        {moredetail ? <RaceDropDown /> : null}

        <SelectionForm
          Icon={null}
          selectionlabel="Veteran Status"
          rightoption={false}
          option={optiontag[2]}
          register={{ ...register("veteranstatus", { required: true }) }}
        />
      </DataBlock>
      <Captcha>
        <ReCAPTCHA
          sitekey="6Le1kc8eAAAAAOuMLNQ9MfWQcymXd8rV5dGDRdaE"
          onChange={() => {
            setCaptcha(true);
          }}
        />
        {captcha ? null : (
          <small style={{ color: "red" }}>Verification Required</small>
        )}
      </Captcha>
      <SubmitButtonBlock>
        <SubmitApplicationButton type="submit" value="SUBMIT APPLICATION" />
      </SubmitButtonBlock>
    </DetailBlock>
  );
};

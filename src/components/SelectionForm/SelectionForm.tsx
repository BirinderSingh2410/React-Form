import React, { useState } from "react";
import styled from "styled-components";


const SelectionFormBlock = styled.div`
    width:90%;
    height:10vh;
    margin-top:4vh;
    display:flex;
    justify-content:space-between;
    p{
        font-size:17px;
        height:50px;
    }
    select{
        width:97%;
        height:50px;
        background:#E2E2E2
        url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='26' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='grey'/></g></svg>")
        no-repeat;
        background-position: right 5px top 50%;
        color:#515357;
        font-size:17px;
        border-radius:4px;
        padding-left:1vw;
        -webkit-appearance: none;
        border:none;
    }
    @media (max-width:800px){
      display:flex;
        flex-direction:column;
        height:70px;
    }
`;

const SelectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

interface SelectionProp {
  selectionlabel: string;
  option: string[];
  Icon: JSX.Element | null;
  register: any;
  rightoption: boolean;
}

export const SelectionForm: React.FC<SelectionProp> = ({
  selectionlabel,
  option,
  Icon,
  register,
  rightoption,
}) => {
  return (
    <SelectionFormBlock>
      <p>
        {selectionlabel} {Icon}
      </p>
      <SelectionBlock>
        <select {...register}>
        
          {option.map((i, index) => {
            return <option key={index}>{i}</option>;
          })}
        </select>
        {!rightoption && selectionlabel === "Gender" ? (
          <small style={{ color: "red" }}>Select valid option</small>
        ) : null}
      </SelectionBlock>
    </SelectionFormBlock>
  );
};

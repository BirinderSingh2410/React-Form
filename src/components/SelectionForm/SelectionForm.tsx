import React, { useState } from "react";
import { icons } from "react-icons";
import styled from "styled-components";


const SelectionFormBlock = styled.div`
    width:70%;
    height:9vh;
    margin-top:4vh;
    display:flex;
    justify-content:space-between;
    p{
        font-size:17px;
        height:50px;
    }
    select{
        width:100%;
        height:40px;
        background-color:#E2E2E2;
        color:#515357;
        font-size:17px;
        border-radius:4px;
        padding-left:1v
        border:none;
    }

    @media (max-width:800px){
        flex-direction:column;
        height:70px;

    }
`;

const SelectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;

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

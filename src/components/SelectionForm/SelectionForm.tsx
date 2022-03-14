import React from 'react'
import { icons } from 'react-icons';
import styled from 'styled-components'
import DownArrow from '../../assests/images/down-arrow-svgrepo-com.svg';

const SelectionFormBlock = styled.div`
    width:70%;
    height:8vh;
    margin:0 12.5%;
    margin-top:4vh;
    display:flex;
    justify-content:space-between;
    p{
        font-size:17px;
    }
    select{
        width:400px;
        height:32px;
        background-color:#E2E2E2;
        color:#515357;
        font-size:17px;
        border-radius:4px;
        padding-left:1v
        border:none;
    }

`;

const ParaBlock = styled.div`
    margin-left:20%;
`
const SelectionBlock = styled.div`
    display:flex;
    flex-direction:column;
`

interface SelectionProp{
    selectionlabel:string;
    option:string[];
    Icon:JSX.Element | null;
    register:any,
    rightoption:boolean
}

export const SelectionForm : React.FC<SelectionProp> = ({selectionlabel,option,Icon,register,rightoption}) => {
  return (
    <SelectionFormBlock>
        <ParaBlock>
            <p>{selectionlabel} {Icon}</p>
        </ParaBlock>
        <SelectionBlock>
            <select  {...register}>
                {
                    option.map((i) =>{
                        return(
                            <option>{i}</option>
                        )
                    })
                }
                <img src={DownArrow}/>
            </select>
            {rightoption ? <small style={{color:"red"}}>Select valid option</small>:null}
        </SelectionBlock>
    </SelectionFormBlock>
  )
}

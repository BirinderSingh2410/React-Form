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
    flex-grow:2;
    p{
        font-size:17px;
    }
    div{
        margin-right:20%;
    }
    select{
        width:400px;
        height:40px;
        background-color:#E2E2E2;
        color:#515357;
        font-size:17px;
        border-radius:4px;
        padding-left:1v
        border:none;
    }

`;




interface SelectionProp{
    selectionlabel:string;
    option:string[];
    Icon:JSX.Element | null;
}

export const SelectionForm : React.FC<SelectionProp> = ({selectionlabel,option,Icon}) => {
  return (
    <SelectionFormBlock>
        <p>{selectionlabel} {Icon}</p>
        <select>
            {
                option.map((i) =>{
                    return(
                        <option>{i}</option>
                    )
                })
            }
            <img src={DownArrow}/>
        </select>
    </SelectionFormBlock>
  )
}

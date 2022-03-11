import React from 'react'
import styled from 'styled-components'
import DownArrow from '../../assests/images/down-arrow-svgrepo-com.svg';

const SelectionFormBlock = styled.div`
    width:70%;
    height:8vh;
    margin:0 15%;
    margin-top:4vh;
    display:flex;
    justify-content:space-between;
    flex-grow:2;
    p{
        font-size:17px;
    }
    div{
        
    }
    select{
        width:400px;
        height:40px;
        background-color:#E2E2E2;
        color:#515357;
        font-size:17px;
        border-radius:4px;
        padding-left:1vw;
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
        <p>{selectionlabel}</p>
        <div>{Icon}</div>
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

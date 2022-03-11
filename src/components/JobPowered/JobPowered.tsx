import React from 'react'
import LeverImage from '../../assests/images/lever-logo-full.svg'
import styled from 'styled-components';

const LeverBlock = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    padding-top:7vh;
    padding-bottom:20vh;
    margin-top:10vh;
    background-color:#edeef1;
    a{
        text-decoration:none;
        color: #579eee;
        border-bottom: 1px solid #78b1f1;
    }
    div{
        display:flex;
        align-items:center;
        p{
            color:#7f838a;
            font-size:15px;
        }
        img{
            width:100px;
            height:100px;
        }
    }
`;

export const JobPowered = () => {
  return (
    <LeverBlock>
        <a href="#">Render Home Page</a>
        <div>
            <p>Job Powered By</p>
            <img src={LeverImage}/>
        </div>
    </LeverBlock>
  )
}

import React from 'react';
import styled from 'styled-components';
import CaptchIcon from '../../assests/images/lever-logo-full.svg'

const CaptchaBlock = styled.div`
    width:30%;
    margin:auto;
    margin-top:5vh;
    border:1px silver solid ;
    border-radius:4px;
    padding-bottom:1.5vh;
    display:flex;
    justify-content:space-evenly;
    padding-top:2vh;

    input{
        width: 30px;
        height:30px;
    }

    p{
        font-size:15px;
        margin-right:2vw;
        padding-top:1vh;
    }
    .picture{
        display:flex;
        flex-direction:column;

    }
    .picture-content{
        display:flex;
        font-size:12px;
    }
`;

export const Captcha = () => {
  return (
    <CaptchaBlock>
        <input type="checkbox"/>
        <p>I am human</p>
        <div className='picture'>
            <img src={CaptchIcon}/>
            <div className='picture-content'>
                <caption>Privacy</caption>
                <caption>-</caption>
                <caption>Terms</caption>
            </div>
        </div>
    </CaptchaBlock>
  )
}

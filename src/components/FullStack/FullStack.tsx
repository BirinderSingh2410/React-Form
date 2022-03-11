import React from 'react'
import styled from 'styled-components'

const FullStackBlock = styled.div`
    width:100%;
    position : static;
    margin-top:100px;
`;
const FullStackContentBlock = styled.div`
    width:65%;
    right:0;
    margin:auto;
    text-align:left;
    padding-bottom: 6vh;
`;
const FullStackHeading = styled.h1`
    font-size: 35px;
    font-weight: 400;
    color: #222326;
`;
const FullStackContent = styled.p`
    font-size: 15px;
    color:  #808080;
    margin-top:4vh;
    font-weight: 600;
`

export const FullStack = () => {
  return (
    <FullStackBlock>
        <FullStackContentBlock>
            <FullStackHeading>Full-Stack Engineer</FullStackHeading>
            <FullStackContent>REMOTE OR SF BAY AREA /PRODUCT – ENGINEERING /FULL-TIME</FullStackContent>
            </FullStackContentBlock>
    </FullStackBlock>
  )
}

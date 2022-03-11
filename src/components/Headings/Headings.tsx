import React from 'react'
import styled from 'styled-components'

const SubmitApplication = styled.h1`
    padding:0 15%;
    font-size: 17px;
    font-weight: 600;
    color: #515357;
    margin-bottom: 6vh;
    margin-top:15vh;
`
interface HeadingsProps{
    content:string;
}
export const Headings :React.FC<HeadingsProps> = ({content}) => {
  return (
        <SubmitApplication>{content}</SubmitApplication>
  )
}

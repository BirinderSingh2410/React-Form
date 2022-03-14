import React from 'react'
import RenderImage from '../../assests/images/932ff883-77c1-4d50-af81-5253e940b6b7-1625854088356.png'
import styled from 'styled-components'

const HaederBlock = styled.div`
  width:100%;
  z-index:100;
  top:0;
  background-color:white;
  overflow:hidden
`;
const HeaderImage  = styled.div`
    position:fixed;
    width:100%; 
    right:0;
    background-color:white
`
const Image = styled.img.attrs({
  src: `${RenderImage}`
})`
  width: 200px;
  height: 80px;
  padding:0 15%;
  position:relatives
`;

export const Header = () => {
  return (
    <HaederBlock>
      <HeaderImage>
        <Image/>
      </HeaderImage>
    </HaederBlock>

  )
}

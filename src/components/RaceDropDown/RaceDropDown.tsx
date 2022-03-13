import React from 'react'
import styled from 'styled-components'

const DropDown = styled.div`
    width:100%;
    padding: 1% 46%;
`;
const ListBlock = styled.ul`
    width:400px;
`;
const ListItem  = styled.li`
    margin-bottom:1vh;

    h4{
        color:#555659;
        font-weight: 450;
        font-size: 17px;
        margin-bottom: 1vh;
    }
    p{
        color:#555659;
        line-height:20px;
        font-size:12px;
    }
`
const Array=[
        {
            heading:"Hispanic or Latino",
            content:"A person of Cuban, Mexican, Puerto Rican, South or     Central American, or other Spanish culture or origin regardless of race."
        },
        {
            heading:"White (Not Hispanic or Latino)",
            content:"A person having origins in any of the original peoples of Europe, the Middle East, or North Africa."
        },
        {
            heading:"Black or African American (Not Hispanic or Latino)",
            content:"A person having origins in any of the black racial groups of Africa."
        },
        {
            heading:"Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
            content:"A person having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands."
        },
        {
            heading:"Asian (Not Hispanic or Latino)",
            content:"A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent, including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam."
        },
        {
            heading:"American Indian or Alaska Native (Not Hispanic or Latino)",
            content:"A person having origins in any of the original peoples of North and South America (including Central America), and who maintain tribal affiliation or community attachment."
        },
        {
            heading:"Two or More Races (Not Hispanic or Latino)",
            content:"All persons who identify with more than one of the above five races."
        }
];

export const RaceDropDown = () => {
  return (
    <DropDown>
        <ListBlock>
            {
                Array.map((i)=>{
                    return(
                        <ListItem>
                            <h4>{i.heading}</h4>
                            <p>{i.content}</p>
                        </ListItem>
                    )
                })
            }
        </ListBlock>
    </DropDown>
  )
}

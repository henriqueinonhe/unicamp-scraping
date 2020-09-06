import React, { useState, useEffect } from "react";
import { ProfessorProfile } from "../Models/ProfessorProfile";
import styled from "styled-components";
import { ScheduleItem } from "./ScheduleItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { primaryColor } from "../theme";
import { ScheduleGrid } from "./ScheduleGrid";


const ProfessorTabContent = styled.li`
  margin: 20px 0;
  padding: 20px 10px;
  box-shadow: 2px 2px 11px 0px rgba(0,0,0,0.39);
  width: 100%;
`;

const ProfessorName = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #111;
`;

const ProfessorInfo = styled.div``;

const Label = styled.h3`
  text-align: center;
  font-size: 20px;
`;

const InstitutesInfo = styled.div`
  padding-top: 10px;
`;

const InstitutesLabel = styled(Label)`
  margin-bottom: 5px;
`;

const InstitutesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Institute = styled.span`
  background-color: ${primaryColor.light};
  border-radius: 3px;
  padding: 5px 5px;
  margin: 0 10px;
`;


const SubjectsInfo = styled.div`
  padding: 10px 0;
`;

const SubjectsLabel = styled(Label)`
  margin-bottom: 5px;
`;


const SubjectsContainer = styled.div`
  text-align: center;
`;

const Subject = styled.span`
  padding: 0 3px;
`;

const ScheduleInfo = styled.div`
`;

const ScheduleLabel = styled(Label)`
  margin-bottom: 5px;
`;

const ScheduleContainer = styled.div``;

interface ProfessorTabProps
{
  profile : ProfessorProfile;
}

export function ProfessorTab(props : ProfessorTabProps) : JSX.Element
{
  const [detailsStatus, setDetailsStatus] = useState<boolean>(false);
  const [detailsFetched, setDetailsFetched] = useState<boolean>(false);
  const [profile, setProfile] = useState(props.profile);

  function handleClick() : void
  {
    setDetailsStatus(!detailsStatus);
  }

  useEffect(() =>
  {
    (async () =>
    {
      if(detailsStatus && !detailsFetched)
      {
        const response = await fetch(`http://localhost:8080/professors/${profile.name}`);
        const data = await response.json();
        setProfile(ProfessorProfile.deserialize(data));
        setDetailsFetched(true);
      }
    })();

  }, [detailsStatus]);


  return (
    <ProfessorTabContent onClick={handleClick}>
      <ProfessorName>{profile.name}</ProfessorName>
      <ProfessorInfo>

        <InstitutesInfo>
          <InstitutesLabel>Institutos</InstitutesLabel>
          <InstitutesContainer>
            {profile.institutes.map(entry => <Institute key={entry.acronym}>{entry.acronym}</Institute>)}
          </InstitutesContainer>
        </InstitutesInfo>

        {
          !detailsStatus ? <></> :
            <>
              <SubjectsInfo>
                <SubjectsLabel>Matérias</SubjectsLabel>
                <SubjectsContainer>
                  {!profile.subjects ? <CircularProgress/> : profile.subjects.map(entry => <Subject key={entry.code}>{entry.code}   </Subject>)}
                </SubjectsContainer>
              </SubjectsInfo>

              <ScheduleInfo>
                <ScheduleLabel>Horários</ScheduleLabel>
                <ScheduleContainer>
                  
                  {!profile.classes ? 
                    <CircularProgress/> : 
                    <>
                      <ScheduleGrid classes={profile.classes} />
                      {profile.classes.map((entry, index : number) => <ScheduleItem key={index} entry={entry} /> )}
                    </>}
                </ScheduleContainer>
              </ScheduleInfo>
            </>
        }

      </ProfessorInfo>
    </ProfessorTabContent>
  );
}

import React, { useState, useEffect } from "react";
import { ProfessorProfile } from "../Models/ProfessorProfile";
import styled from "styled-components";
import { ScheduleItem } from "./ScheduleItem";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProfessorTabContent = styled.div``;

const ProfessorName = styled(Typography).attrs(() => ({
  variant: "h4",
  component: "h2"
}))``;

const ProfessorInfo = styled.div``;

const InstitutesInfo = styled.div``;

const InstitutesLabel = styled(Typography).attrs(() => ({
  variant: "h5",
  component: "h3"
}))``;

const InstitutesContainer = styled.div``;

const Institute = styled(Typography).attrs(() => ({
  variant: "body1",
  component: "span"
}))``;


const SubjectsInfo = styled.div``;

const SubjectsLabel = styled(Typography).attrs(() => ({
  variant: "h5",
  component: "h3"
}))``;


const SubjectsContainer = styled.div``;

const Subject = styled.span`
  padding: 0 3px;
`;

const ScheduleInfo = styled.div``;

const ScheduleLabel = styled.h3``;

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
                  {!profile.classes ? <CircularProgress/> : profile.classes.map((entry, index : number) => <ScheduleItem key={index} entry={entry}/>)}
                </ScheduleContainer>
              </ScheduleInfo>
            </>
        }

      </ProfessorInfo>
    </ProfessorTabContent>
  );
}

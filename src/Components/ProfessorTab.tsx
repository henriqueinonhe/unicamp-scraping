import React, { useState } from "react";
import { ProfessorProfile } from "../Models/ProfessorProfile";
import styled from "styled-components";
import { ScheduleItem } from "./ScheduleItem";

const ProfessorTabContent = styled.div``;

const ProfessorName = styled.h2``;

const ProfessorInfo = styled.div``;

const InstitutesInfo = styled.div``;

const InstitutesLabel = styled.h3``;

const InstitutesContainer = styled.div``;

const Institute = styled.span`
  padding: 0 3px;
`;

const SubjectsInfo = styled.div``;

const SubjectsLabel = styled.h3``;

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
  const { profile } = props;

  const [detailsStatus, setDetailsStatus] = useState<boolean>(false);

  function handleClick() : void
  {
    setDetailsStatus(!detailsStatus);
  }

  return (
    <ProfessorTabContent onClick={handleClick}>
      <ProfessorName>{profile.name}</ProfessorName>
      <ProfessorInfo>

        <InstitutesInfo>
          <InstitutesLabel>Institutos</InstitutesLabel>
          <InstitutesContainer>
            {Array.from(profile.instituteEntries).map(entry => <Institute key={entry.acronym}>{entry.acronym}</Institute>)}
          </InstitutesContainer>
        </InstitutesInfo>

        <SubjectsInfo>
          <SubjectsLabel>Matérias</SubjectsLabel>
          <SubjectsContainer>
            {Array.from(profile.subjectEntries).map(entry => <Subject key={entry.code}>{entry.code}</Subject>)}
          </SubjectsContainer>
        </SubjectsInfo>

        {
          detailsStatus ? <></> :
            <ScheduleInfo>
              <ScheduleLabel>Horários</ScheduleLabel>
              <ScheduleContainer>
                {profile.classSchedules.map((entry, index) => <ScheduleItem key={index} entry={entry}/>)}
              </ScheduleContainer>
            </ScheduleInfo>
        }

      </ProfessorInfo>
    </ProfessorTabContent>
  );
}

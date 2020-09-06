import React, { useState, useEffect } from "react";
import { ProfessorProfile } from "../Models/ProfessorProfile";
import styled from "styled-components";
import { ScheduleItem } from "./ScheduleItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { primaryColor, secondaryColor } from "../theme";
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
  padding-top: 20px;
`;

const InstitutesLabel = styled(Label)`
  margin-bottom: 5px;
`;

const InstitutesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Institute = styled.a`
  color: #111;
  text-decoration: none;
  background-color: ${primaryColor.lighter};
  border-radius: 20px;
  width: 70px;
  height: 30px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SubjectsInfo = styled.div`
  padding: 20px 0;
`;

const SubjectsLabel = styled(Label)`
  margin-bottom: 5px;
`;


const SubjectsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Subject = styled.a`
  color: #111;
  text-decoration: none;
  background-color: ${secondaryColor.main};
  border-radius: 20px;
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ScheduleInfo = styled.div`
`;

const ScheduleLabel = styled(Label)`
  margin-bottom: 5px;
`;

const ScheduleContainer = styled.div``;

const ScheduleList = styled.ul`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
        const response = await fetch(`http://localhost:${process.env.PORT}/professors/${profile.name}`);
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
            {profile.institutes.map(entry => <Institute key={entry.acronym} href={entry.link}>{entry.acronym}</Institute>)}
          </InstitutesContainer>
        </InstitutesInfo>

        {
          !detailsStatus ? <></> :
            <>
              <SubjectsInfo>
                <SubjectsLabel>Matérias</SubjectsLabel>
                <SubjectsContainer>
                  {!profile.subjects ? <CircularProgress/> : profile.subjects.map(entry => <Subject key={entry.code} href={entry.link}>{entry.code}</Subject>)}
                </SubjectsContainer>
              </SubjectsInfo>

              <ScheduleInfo>
                <ScheduleLabel>Horários</ScheduleLabel>
                <ScheduleContainer>
                  
                  {!profile.classes ? 
                    <CircularProgress/> : 
                    <>
                      <ScheduleGrid classes={profile.classes} />
                      <ScheduleList>
                        {profile.classes.map((entry, index : number) => <ScheduleItem key={index} entry={entry} /> )}
                      </ScheduleList>
                    </>}
                </ScheduleContainer>
              </ScheduleInfo>
            </>
        }

      </ProfessorInfo>
    </ProfessorTabContent>
  );
}

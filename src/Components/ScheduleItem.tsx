import React from "react";
import styled from "styled-components";
import { ProfessorProfileClass } from "../Models/ProfessorProfile";

const ScheduleContent = styled.div`
  margin: 5px 0;
`;

const ScheduleData = styled.span`
  padding: 0 3px;
`;

interface ScheduleProps
{
  entry : ProfessorProfileClass;
}

export function ScheduleItem(props : ScheduleProps) : JSX.Element
{
  const { entry } = props;

  return (
    <ScheduleContent>
      <ScheduleData>{entry.weekDay}</ScheduleData>
      <ScheduleData>{entry.beginTime.toString()}</ScheduleData>
      -
      <ScheduleData>{entry.endTime.toString()}</ScheduleData>
      <ScheduleData>{entry.classRoom}</ScheduleData>
      <ScheduleData>{entry.subjectCode}</ScheduleData>
    </ScheduleContent>
  );
}
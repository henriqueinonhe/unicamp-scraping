import React from "react";
import { ClassScheduleEntry } from "../Models/ClassScheduleEntry";
import styled from "styled-components";

const ScheduleContent = styled.div``;

interface ScheduleProps
{
  entry : ClassScheduleEntry;
}

export function ScheduleItem(props : ScheduleProps) : JSX.Element
{
  const { entry } = props;

  return (
    <ScheduleContent>
      <span>{entry.weekDay}</span>
      <span>{entry.beginTime}</span>
      <span>{entry.endTime}</span>
      <span>{entry.classRoom}</span>
    </ScheduleContent>
  );
}
import React from "react";
import styled from "styled-components";
import { Class } from "../Models/ProfessorProfile";
import { DayTime } from "../Models/DayTime";

const Container = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  &:last-child {
    border-bottom: 1px solid #AAA;
  }
`;

const Column = styled.div`
  width: 14.28%;
  border-top: 1px solid #AAA;
  border-left: 1px solid #AAA;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  overflow-x: hidden;

  &:last-child {
   border-right: 1px solid #AAA;
  }
`;

interface ScheduleGridProps 
{
  classes : Array<Class>;
}

export function ScheduleGrid(props : ScheduleGridProps) : JSX.Element
{
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const {classes} = props;

  function findClass(weekDay : string, hour : number) : Class | undefined
  {
    return classes.find(item => 
    {
      const wrappedHour = new DayTime(hour, 0);

      return item.weekDay === weekDay &&
             ((wrappedHour.compare(item.beginTime) === 1 || 
             wrappedHour.compare(item.beginTime) === 0) &&
             (wrappedHour.compare(item.endTime) === -1 || 
             wrappedHour.compare(item.endTime) === 0 ));
    });
  }

  return (
    <Container>
      <Row>
        <Column>Segunda</Column>
        <Column>Terça</Column>
        <Column>Quarta</Column>
        <Column>Quinta</Column>
        <Column>Sexta</Column>
        <Column>Sábado</Column>
      </Row>

      {
        hours.map(hour => 
          <Row key={hour}>
            <Column>{`${hour}:00`}</Column>
            <Column>{<div>{findClass("Segunda", hour)?.classRoom}</div>}</Column>
            <Column>{<div>{findClass("Terça", hour)?.classRoom}</div>}</Column>
            <Column>{<div>{findClass("Quarta", hour)?.classRoom}</div>}</Column>
            <Column>{<div>{findClass("Quinta", hour)?.classRoom}</div>}</Column>
            <Column>{<div>{findClass("Sexta", hour)?.classRoom}</div>}</Column>
            <Column>{<div>{findClass("Sábado", hour)?.classRoom}</div>}</Column>
          </Row>)
      }

    </Container>
  );
}
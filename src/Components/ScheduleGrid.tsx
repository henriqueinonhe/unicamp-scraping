import React from "react";
import styled from "styled-components";
import { ProfessorProfileClass } from "../Models/ProfessorProfile";
import { DayTime } from "../Models/DayTime";
import { secondaryColor } from "../theme";

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
  classes : Array<ProfessorProfileClass>;
}

export function ScheduleGrid(props : ScheduleGridProps) : JSX.Element
{
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const {classes} = props;

  function findClass(weekDay : string, hour : number) : ProfessorProfileClass | undefined
  {
    return classes?.find(item => 
    {
      const wrappedHour = new DayTime(hour, 0);

      return item.weekDay === weekDay &&
             ((wrappedHour.compare(item.beginTime) === 1 || 
             wrappedHour.compare(item.beginTime) === 0) &&
             (wrappedHour.compare(item.endTime) === -1 || 
             wrappedHour.compare(item.endTime) === 0 ));
    });
  }

  function formatClassEntry(classEntry : ProfessorProfileClass | undefined) : string | undefined
  {
    if(!classEntry)
    {
      return undefined;
    }

    return `${classEntry.subjectCode} - ${classEntry.classRoom}`;
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
            <Column 
              style={{backgroundColor: findClass("Segunda", hour) ? secondaryColor.light : "white"}}>
              {formatClassEntry(findClass("Segunda", hour))}
            </Column>
            <Column 
              style={{backgroundColor: findClass("Terça", hour) ? secondaryColor.light : "white"}}>{
                formatClassEntry(findClass("Terça", hour))}
            </Column>
            <Column 
              style={{backgroundColor: findClass("Quarta", hour) ? secondaryColor.light : "white"}}>{
                formatClassEntry(findClass("Quarta", hour))}
            </Column>
            <Column 
              style={{backgroundColor: findClass("Quinta", hour) ? secondaryColor.light : "white"}}>{
                formatClassEntry(findClass("Quinta", hour))}
            </Column>
            <Column 
              style={{backgroundColor: findClass("Sexta", hour) ? secondaryColor.light : "white"}}>{
                formatClassEntry(findClass("Sexta", hour))}
            </Column>
            <Column 
              style={{backgroundColor: findClass("Sábado", hour) ? secondaryColor.light : "white"}}>{
                formatClassEntry(findClass("Sábado", hour))}
            </Column>
          </Row>)
      }

    </Container>
  );
}
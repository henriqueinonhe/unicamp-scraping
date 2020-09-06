import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ProfessorsList } from "./Components/ProfessorsList";

const Body = styled.div`
  font-family: Roboto, sans-serif;
  color: #111;
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function App() : JSX.Element
{
  return (
    <Body>
      <ProfessorsList />      
    </ Body>
  );
}

const rootNode = document.getElementById("root");

ReactDOM.render(<App />, rootNode);
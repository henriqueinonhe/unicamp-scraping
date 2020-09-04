import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { ProfessorsList } from "./Components/ProfessorsList";

const Body = styled(Container).attrs(() => ({
  maxWidth: "lg"
}))``;

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
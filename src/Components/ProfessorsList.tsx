import React, { useEffect, useState } from "react";
import { ProfessorProfile } from "../Models/ProfessorProfile";
import { ProfessorTab } from "./ProfessorTab";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 80%;
  max-width: 600px;
`;

const ProfessorsContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function ProfessorsList() : JSX.Element
{
  const bufferSize = 30;

  const [professorsProfiles, setProfessorsProfiles] = useState<Array<ProfessorProfile>>([]);
  const [selectedProfessorsProfiles, setSelectedProfessorsProfiles] = useState<Array<ProfessorProfile>>([]);
  const [visibleProfessorsProfiles, setVisibleProfessorsProfiles] = useState<Array<ProfessorProfile>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  //Professors Initialization
  useEffect(() =>
  {
    (async () => 
    {
      const response = await(fetch(`https://unicamp-scraping.herokuapp.com//professors`));
      const data = await response.json();
      setProfessorsProfiles(data);
      setSelectedProfessorsProfiles(data);
      setVisibleProfessorsProfiles(data.slice(0, bufferSize));
      setIsLoading(false);
    })();
  }, []);

  //Infinite Scroll
  useEffect(() =>
  {
    const callback = () : void => 
    {
      const professorsContainer = document.querySelector("#professorsContainer")!;
      const professorsContainerYOffset = professorsContainer.getBoundingClientRect().top;
      const professorsContainerHeight = professorsContainer.getBoundingClientRect().height;
      if(window.innerHeight >= professorsContainerYOffset + professorsContainerHeight)
      {
        setIsLoading(true);
        const visibleProfessorsCount = visibleProfessorsProfiles.length;
        setVisibleProfessorsProfiles(selectedProfessorsProfiles.slice(0, visibleProfessorsCount + bufferSize));
        setIsLoading(false);
      }
    };

    window.addEventListener("scroll", callback);
    return () =>
    {
      window.removeEventListener("scroll", callback);
    };

  }, [visibleProfessorsProfiles, selectedProfessorsProfiles]);

  function handleSearchInputChange(event : React.SyntheticEvent) : void
  {
    const target = event.target as HTMLInputElement;
    const newSearchInputValue = target.value;
    const newSelectedProfessorsProfiles = professorsProfiles.filter(profile => new RegExp(`${newSearchInputValue}`, "ig").test(profile.name));

    setSearchInputValue(newSearchInputValue);
    setSelectedProfessorsProfiles(newSelectedProfessorsProfiles);
    setVisibleProfessorsProfiles(newSelectedProfessorsProfiles.slice(0, bufferSize));
  }

  return (
    <Container>
      <input type="text" onChange={handleSearchInputChange} value={searchInputValue} placeholder="Nome"/>
      <ProfessorsContainer id="professorsContainer">
        {
          visibleProfessorsProfiles.map(profile => <ProfessorTab key={profile.name} profile={profile} />)}
        {isLoading ? <CircularProgress /> : <></>}
      </ProfessorsContainer>
    </Container>
  );
}
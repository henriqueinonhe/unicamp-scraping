import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { generateProfessorsProfiles } from "./controller";

function App() : JSX.Element
{
  const [professorsProfiles, setProfessorsProfiles] = useState<Array<ProfessorProfile>>([]);

  useEffect(() =>
  {
    (async () => 
    {
      const response = await(fetch("http://localhost:8080/data"));
      const data = await response.json();
      setProfessorsProfiles(generateProfessorsProfiles(data));
    })();
  }, []);

  return (
    <>
      {professorsProfiles.length === 0 ? "Loading!" : professorsProfiles.map(profile => <p key={profile.name}>{profile.name}</p>)}
    </>
  );
}

const rootNode = document.getElementById("root");

ReactDOM.render(<App />, rootNode);
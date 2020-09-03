import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { ProfessorTab } from "./Components/ProfessorTab";

function App() : JSX.Element
{
  const [professorsProfiles, setProfessorsProfiles] = useState<Array<ProfessorProfile>>([]);

  useEffect(() =>
  {
    (async () => 
    {
      const response = await(fetch("http://localhost:8080/professors"));
      const data = await response.json();
      setProfessorsProfiles(data.map((entry : Record<string, unknown>) => ProfessorProfile.deserialize(entry)));
    })();
  }, []);

  return (
    <>
      {professorsProfiles.length === 0 ? "Loading!" : professorsProfiles.map(profile => <ProfessorTab key={profile.name} profile={profile} />)}
    </>
  );
}

const rootNode = document.getElementById("root");

ReactDOM.render(<App />, rootNode);
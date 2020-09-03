import { InstituteEntry } from "./Models/InstituteEntry";
import { ProfessorProfile } from "./Models/ProfessorProfile";

export function generateProfessorsProfiles(instituteEntries : Array<InstituteEntry>) : Array<ProfessorProfile>
{
  //Professors Profiles
  const professorsProfiles = new Map<string, ProfessorProfile>();
  for(const instituteEntry of instituteEntries)
  {
    const subjectEntries = instituteEntry.subjectEntries;
    for(const subjectEntry of subjectEntries)
    {
      const classEntries = subjectEntry.classEntries;
      for(const classEntry of classEntries)
      {
        const professors = classEntry.professors;
        for(const professor of professors)
        {
          if(!professorsProfiles.has(professor))
          {
            professorsProfiles.set(professor, new ProfessorProfile(professor));
          }

          const professorProfile = professorsProfiles.get(professor)!;
          professorProfile.instituteEntries.add(instituteEntry);
          professorProfile.subjectEntries.add(subjectEntry);
          professorProfile.classSchedules.push(... classEntry.schedule);
        }
      }
    }
  }

  return Array.from(professorsProfiles.values());
}
import {useEffect, useState} from "react";
import {getAllDepartments} from "@/experience/careers/clients/CareersClient.ts";
import {DepartmentCard} from "@/experience/careers/components/DepartmentCard.tsx";
import type {Department} from "@/experience/careers/types/department.ts";

export function CareersPage(){
  //BOX THAT STARTS EMPTY BUT EVENTUALLY HOLDS LIST OF DEPARTMENTS.
  const [departments, setDepartments] = useState<Department[]>([]);

  //GETTING DEPARTMENTS USING CAREER CLIENT, THEN SETTING THEM USING USE-STATE
  //USE-EFFECT IS USED FOR FETCHING DATA FROM THE SERVER.
  useEffect(() => {
    getAllDepartments().then(setDepartments);
  }, []);

  return(
      <div>
        <h1>Careers</h1>
        <h2>Featured Departments</h2>
        {departments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
        ))}
      </div>

      );
}
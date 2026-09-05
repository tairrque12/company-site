import type {Department} from "@/experience/careers/types/department.ts";
import {useNavigate} from "react-router";

interface DepartmentCardProps {
    department: Department
}

export function DepartmentCard({department}: DepartmentCardProps) {
    const navigate = useNavigate();

    return(
        <div>
            <h1>{department.name}</h1>
            <p>{department.tagline}</p>

            <button onClick={() => navigate(`/careers/${department.slug}`)}>
                View Jobs
            </button>

            <button onClick={() => navigate(`/careers/${department.slug}/about`)}>
                Learn More
            </button>

        </div>
    );
}
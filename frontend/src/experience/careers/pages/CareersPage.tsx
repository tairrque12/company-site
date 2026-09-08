import {useEffect, useState} from "react";
import type {Department} from "@/experience/careers/types/department.ts";
import {getAllDepartments} from "@/experience/careers/clients/CareersClient.ts";
import {DepartmentCard} from "@/experience/careers/components/DepartmentCard.tsx";
import {CareersHeroVideo} from "@/experience/careers/components/CareersHeroVideo.tsx";





export function CareersPage() {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        getAllDepartments().then(setDepartments);
    }, []);

    return (
        <div>
            <CareersHeroVideo/>

            <div>
                <h1 className={'text-4xl font-bold py-30 font-heading'}>Become Part Of Our Mission</h1>
            </div>

            <div className="p-8">
                <h2 className="text-4xl font-bold mb-6">Featured Departments</h2>
                <div className="grid grid-cols-3 gap-6">
                    {departments.map((department) => (
                        <DepartmentCard key={department.slug} department={department} />
                    ))}
                </div>
            </div>
        </div>
    );
}
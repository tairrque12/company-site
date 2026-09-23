import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import {getDepartmentBySlug} from "@/experience/careers/clients/CareersClient";
import type {DepartmentDetail} from "@/experience/careers/types/department";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";

export function DepartmentPage() {
    const { slug } = useParams();
    const [department, setDepartment] = useState<DepartmentDetail | null>(null);

    useEffect(() => {
        if (slug) {
            getDepartmentBySlug(slug).then(setDepartment);
        }
    }, [slug]);

    if (!department) {
        return null;
    }

    return (
        <div className="p-8">
            <h1 className="text-6xl font-bold mb-2">{department.name}</h1>
            <p className="text-xl text-muted-foreground mb-12">{department.description}</p>

            <Accordion type="single" collapsible className="w-full max-w-4xl">
                {department.teams.map((team) => (
                    <AccordionItem key={team.slug} value={team.slug} className="border-b">

                        <AccordionTrigger className="text-2xl font-normal py-6 hover:no-underline">
                            <span className="flex w-full justify-between items-center pr-4">
                                <span>{team.name}</span>
                                <span className="text-base text-muted-foreground">
                                    {team.jobPostings.length} {team.jobPostings.length === 1 ? "Role" : "Roles"}
                                </span>
                            </span>
                        </AccordionTrigger>

                        <AccordionContent>
                            {team.jobPostings.map((posting) => (
                                <div key={posting.id} className="flex justify-between items-center py-3 pl-4">
                                    <span className="font-medium">{posting.title}</span>
                                    <span className="text-muted-foreground">{posting.location}</span>
                                    <Link to={`/careers/robotics/jobs/${posting.id}/apply`} className="underline">Apply</Link>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
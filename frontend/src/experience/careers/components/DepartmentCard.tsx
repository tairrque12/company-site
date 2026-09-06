import type {Department} from "@/experience/careers/types/department.ts";
import {useNavigate} from "react-router";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";


interface DepartmentCardProps {
    department: Department
}

export function DepartmentCard({department}: DepartmentCardProps) {
    const navigate = useNavigate();

    return(
        <Card>

        <CardHeader>
           <CardTitle> <h1>{department.name}</h1></CardTitle>
           <CardDescription><p>{department.tagline}</p> </CardDescription>
            </CardHeader>

            <CardFooter className={'gap-4'}>
                <Button onClick={() => navigate(`/careers/${department.slug}`)}>
                    View Jobs
                </Button>

                <Button variant={'link'} onClick={() => navigate(`/careers/${department.slug}/about`)}>
                    Learn More
                </Button>
            </CardFooter>
        </Card>
    );
}
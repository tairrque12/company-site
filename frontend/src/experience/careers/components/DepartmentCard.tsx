import { useNavigate } from "react-router";
import type { Department } from "@/experience/careers/types/department";
import { Button } from "@/components/ui/button";

interface DepartmentCardProps {
    department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
    const navigate = useNavigate();

    return (
        <div>
            <img
                src={department.imageUrl}
                alt={department.name}
                className="w-full aspect-square object-cover rounded-2xl"
            />
            <h2 className="text-2xl font-bold mt-4">{department.name}</h2>


            <div className="flex gap-4 mt-1">
                <Button
                    variant="link"
                    className="p-0 h-auto underline"
                    onClick={() => navigate(`/careers/${department.slug}`)}
                >
                    View Jobs
                </Button>

                <Button
                    variant="link"
                    className="p-0 h-auto underline"
                    onClick={() => navigate(`/careers/${department.slug}/about`)}
                >
                    Learn More
                </Button>

            </div>
            <p className="text-muted-foreground mt-2">{department.tagline}</p>
        </div>
    );
}
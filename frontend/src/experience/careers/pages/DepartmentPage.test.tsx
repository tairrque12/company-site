import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { DepartmentPage } from "@/experience/careers/pages/DepartmentPage";
import * as CareersClient from "@/experience/careers/clients/CareersClient";
import type { DepartmentDetail } from "@/experience/careers/types/department";
import {expect, it, vi} from "vitest";

const department: DepartmentDetail = {
    name: "Robotics",
    slug: "robotics",
    tagline: "Engineer The Impossible.",
    description: "We build humanoid robots.",
    imageUrl: "/images/robot-department.jpg",
    teams: [],
};

const departmentTeams: DepartmentDetail = {
    // ...same fields as before...
    teams: [
        {
            name: "AI & Robotics",
            slug: "ai-robotics",
            jobPostings: [
                { id: 1, title: "AI Engineer", location: "Austin, TX", remote: false },
                { id: 2, title: "Simulation Engineer", location: "Remote", remote: true },
            ],
        },
        {
            name: "Mechanical Engineering",
            slug: "mechanical-engineering",
            jobPostings: [
                { id: 3, title: "Mechanical Design Engineer", location: "Austin, TX", remote: false },
            ],
        },
    ],
};

function renderDepartmentPage() {
    render(
        <MemoryRouter initialEntries={["/careers/robotics"]}>
            <Routes>
                <Route path="/careers/:slug" element={<DepartmentPage />} />
            </Routes>
        </MemoryRouter>
    );
}

describe("DepartmentPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render Department Name',async () => {
        vi.spyOn(CareersClient, "getDepartmentBySlug").mockResolvedValue(department);
        renderDepartmentPage();
        expect(await screen.findByText('Robotics')).toBeInTheDocument()
    });
    it('should render the department description', async () => {
        vi.spyOn(CareersClient, "getDepartmentBySlug").mockResolvedValue(department);
        renderDepartmentPage();
        expect(await screen.findByText('We build humanoid robots.')).toBeInTheDocument();
    });
    it('should render each teams name', async () =>{
        vi.spyOn(CareersClient, "getDepartmentBySlug").mockResolvedValue(departmentTeams);
        renderDepartmentPage();
        expect(await screen.findByText('AI & Robotics')).toBeInTheDocument();
        expect(await screen.findByText('Mechanical Engineering')).toBeInTheDocument();
    })
    it('should render each teams name', async () => {
        vi.spyOn(CareersClient, "getDepartmentBySlug").mockResolvedValue(departmentTeams);
        renderDepartmentPage();
        expect(await screen.findByText('2 Roles')).toBeInTheDocument();
        expect(await screen.findByText('1 Role')).toBeInTheDocument();
    });
    it("should not show job postings until a team is expanded", async () => {
        vi.spyOn(CareersClient, "getDepartmentBySlug").mockResolvedValue(departmentTeams);
        renderDepartmentPage();
        await screen.findByText("AI & Robotics");
        expect(screen.queryByText("AI Engineer")).not.toBeInTheDocument();
    });
});
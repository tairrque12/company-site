import {describe, expect, it, vi, beforeEach} from "vitest";
import {render, screen} from "@testing-library/react";
import {CareersPage} from "@/experience/careers/pages/CareersPage.tsx";
import {MemoryRouter} from "react-router";

describe('CareerPage', () => {
    const renderCareerPage = () =>{
        render(<CareersPage/>, {wrapper: MemoryRouter});
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render Careers Header', () => {
        renderCareerPage()
        expect(screen.getByText('Careers')).toBeInTheDocument();
    });
    it('should should render Featured Department Header', () => {
        renderCareerPage()
        expect(screen.getByText('Featured Departments')).toBeInTheDocument();
    });
    it('should render a department card for each department returned', async () => {
        vi.spyOn(CareersClient, 'getAllDepartments').mockResolveValue([
            {
                name: 'Robotics',
                slug: 'robotics',
                tagline: 'Engineer The Impossible.',
                description: '\'We develop humanoid robots.'
            }
        ]);
        renderCareerPage();
        expect(await screen.findByText('Robotics')).toBeInTheDocument();
    });

})
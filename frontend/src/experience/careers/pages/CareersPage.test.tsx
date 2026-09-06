import {describe, expect, it, vi, beforeEach} from "vitest";
import {render, screen} from "@testing-library/react";
import {CareersPage} from "@/experience/careers/pages/CareersPage.tsx";
import {MemoryRouter} from "react-router";
import * as CareersClient from "@/experience/careers/clients/CareersClient";

describe('CareerPage', () => {
    const renderCareerPage = () => {
        render(<CareersPage/>, {wrapper: MemoryRouter});
    }

    beforeEach(() => {
        vi.spyOn(CareersClient, 'getAllDepartments').mockResolvedValue([]);
    });

    it('should render Careers Header', () => {
        renderCareerPage()
        expect(screen.getByText('Careers')).toBeInTheDocument();
    });

    it('should render Featured Department Header', () => {
        renderCareerPage()
        expect(screen.getByText('Featured Departments')).toBeInTheDocument();
    });

    it('should render a department card for each department returned', async () => {
        vi.spyOn(CareersClient, 'getAllDepartments').mockResolvedValue([
            {
                name: 'Robotics',
                slug: 'robotics',
                tagline: 'Engineer The Impossible.',
                description: 'We develop humanoid robots.',
                imageUrl: 'robotics.jpg'
            }
        ]);
        renderCareerPage();
        expect(await screen.findByText('Robotics')).toBeInTheDocument();
    });
})
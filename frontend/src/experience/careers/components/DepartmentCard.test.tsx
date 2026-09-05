import {beforeEach, describe, expect, it, vi,} from "vitest";
import type {Department} from "@/experience/careers/types/department.ts";
import {render, screen} from "@testing-library/react";
import {DepartmentCard} from "@/experience/careers/components/DepartmentCard.tsx";
import {MemoryRouter} from "react-router";
import userEvent from "@testing-library/user-event";


const { navigate } = vi.hoisted(() => ({
    navigate: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-router")>();
    return { ...actual, useNavigate: () => navigate };
});


describe('DepartmentCard', () =>{
    const department: Department = {
        name: 'Robotics',
        slug: 'robotics',
        tagline: 'Engineer The Impossible. Build The Next Generation Of Humanoid Robots',
        description: 'We Develop & Deploy Humanoid Robots At Scale'
    }

    const renderDepartmentCard = () =>{
        render(<DepartmentCard department={department}/>, {wrapper: MemoryRouter})
    }

    beforeEach(() => navigate.mockClear());

    it('should render the department name', () => {
        renderDepartmentCard();
        expect(screen.getByText('Robotics')).toBeInTheDocument();
    })
    it('should display department tagline', () => {
        renderDepartmentCard();
        expect(screen.getByText(department.tagline)).toBeInTheDocument();
    });
    it('should navigate to department page when View Jobs is clicked', async () => {
        renderDepartmentCard();
        await userEvent.click(
            await screen.findByRole('button', {name: /view jobs/i})
        );
        expect(navigate).toHaveBeenCalledWith('/careers/robotics');
    });
    it('should navigate to the about page when learn more is clicked', async () => {
        renderDepartmentCard();
        await userEvent.click(
            await screen.findByRole('button', {name: /learn more/i})
        );
        expect(navigate).toHaveBeenCalledWith('/careers/robotics/about');
    });
})
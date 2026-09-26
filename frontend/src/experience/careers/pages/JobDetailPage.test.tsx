import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router";
import {expect, it, vi} from "vitest";

import {JobDetailPage} from "@/experience/careers/pages/JobDetailPage.tsx";
import {getJobPostingById} from "@/experience/careers/clients/CareersClient.ts";
import type {JobPostingDetail} from "@/experience/careers/types/department.ts";
import userEvent from "@testing-library/user-event";


// MOCK THE CAREERS CLIENT
// We are testing JobDetailPage, NOT the real HTTP request
vi.mock("@/experience/careers/clients/CareersClient.ts", () => ({
    getJobPostingById: vi.fn(),
}));


// FAKE JOB DATA
const mockJobPostingDetail: JobPostingDetail = {
    id: 1,
    title: "AI Engineer",
    location: "Austin, Texas",
    jobType: "Full-Time",
    reqId: "1AA",
    aboutRole: "Work In AI",
    responsibilities: "Code AI",
    requirements: "Software Engineering experience",
    bonusQualifications: "Learning Mindset",
    salaryMin: 150000,
    salaryMax: 300000,
    teamName: "Robotics",
    departmentName: "AI",
};


// REUSABLE TEST SETUP
const renderJobDetailPage = () => {

    // ARRANGE:
    // Pretend the client returned our fake job
    vi.mocked(getJobPostingById)
        .mockResolvedValue(mockJobPostingDetail);

    // ACT:
    // Pretend the user visited Job #1
    return render(
        <MemoryRouter initialEntries={["/careers/robotics/jobs/1"]}>
            <Routes>
                <Route
                    path="/careers/:departmentSlug/jobs/:id"
                    element={<JobDetailPage />}
                />

                <Route
                    path="/careers/:departmentSlug"
                    element={<div>All Job Postings</div>}
                />

                <Route
                    path="/careers/:departmentSlug/jobs/:id/apply"
                    element={<div>Application Page</div>}
                />

            </Routes>
        </MemoryRouter>
    );
};


it("should display the job title and location", async () => {
    renderJobDetailPage();

    expect(
        await screen.findByText("AI Engineer")
    ).toBeInTheDocument();

    expect(
        await screen.findByText("Austin, Texas")
    ).toBeInTheDocument();
});

it('should display the about the role section', async () => {
    renderJobDetailPage()
    expect(await screen.findByText('About The Role')).toBeInTheDocument();
    expect(await screen.findByText('Work In AI')).toBeInTheDocument();
});
it('should display the responsibilities section and description', async () => {
    renderJobDetailPage();
    expect(await screen.findByText('Responsibilities')).toBeInTheDocument();
    expect(await screen.findByText('Code AI')).toBeInTheDocument();
});
it('should display the requirements section', async () => {
    renderJobDetailPage();
    expect(await screen.findByText('Requirements')).toBeInTheDocument();
    expect(await screen.findByText('Software Engineering experience')).toBeInTheDocument()
});
it('should render the bonus qualification section',async () => {
    renderJobDetailPage();
    expect(await screen.findByText('Bonus Qualifications')).toBeInTheDocument();
    expect(await screen.findByText('Learning Mindset')).toBeInTheDocument();
});
it('should render the compensation section', async () => {
    renderJobDetailPage();
    expect(await screen.findByText('Compensation')).toBeInTheDocument();
    expect(await screen.findByText(/150000 - 30000/)).toBeInTheDocument();
});
it('should navigate to the application page when apply is clicked', async () => {
    renderJobDetailPage();
    const applyButton = await (screen.findByRole('button', {name:/Apply/i}));
    await userEvent.click(applyButton);
    expect(await screen.findByText('Application Page')).toBeInTheDocument();
});
it('should navigate back to all job postings', async () => {
    renderJobDetailPage();
    const backToJobsLink = await screen.findByRole('link', {name:/back to jobs/i})
    await userEvent.click(backToJobsLink);
    expect(await screen.findByText('All Job Postings')).toBeInTheDocument();
});

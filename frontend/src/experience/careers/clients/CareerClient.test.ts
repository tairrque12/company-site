import type {
    JobApplicationRequest,
    JobApplicationResponse,
    JobPostingDetail
} from "@/experience/careers/types/department.ts";
import {createJobApplication, getJobPostingById} from "@/experience/careers/clients/CareersClient.ts";

export const mockJobPostingDetail: JobPostingDetail ={
    id:1,
    title: 'AI Engineer',
    location:'Austin, Texas',
    jobType: 'Full-Time',
    reqId: '1AA',
    aboutRole:'Work In AI',
    responsibilities: 'Code AI',
    requirements:'Software Engineering experience',
    bonusQualifications: 'Learning Mindset',
    salaryMin: 150000,
    salaryMax: 300000,
    teamName: 'Robotics',
    departmentName: 'AI'
}

it('should get job posting by id', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockJobPostingDetail),
    });
    const result = await getJobPostingById(1);
    expect(fetch).toHaveBeenCalledWith("/api/careers/jobs/1");
    expect(result).toEqual(mockJobPostingDetail);
});
it('should submit a job application and return its response', async () => {
    const request: JobApplicationRequest = {
        jobPostingId: 1,
        firstName: 'Tairrque',
        lastName: 'Baker',
        preferredFirstName: 'Tairrque',
        email: 'tbaker1312@gmail.com',
        country: 'United States',
        phone: '334-820-9553',
        city: 'Lanett',
        linkedinUrl: 'https:/linkedin/tairrque',
        websiteUrl: 'www.tairrqueRobotics.com'
    };
    const expectedResponse: JobApplicationResponse ={
        id: 10,
        firstName: 'Tairrque',
        lastName: 'Baker',
        jobPostingTitle: 'AI Engineer',
        departmentName: 'Robotics',
        submittedAt: '2026-10-03T18:00:00Z'
    };
    //ARRANGE THE FAKE BACKEND RESPONSE
    globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: vi.fn().mockResolvedValue(expectedResponse)
    })
    //ACT
    const actualResponse = await createJobApplication(request);

    // ASSERT - Verify the HTTP request
    expect(fetch).toHaveBeenCalledWith(
        "/api/job-applications",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }
    );
    // ASSERT - Verify the returned data
    expect(actualResponse).toEqual(expectedResponse);

});

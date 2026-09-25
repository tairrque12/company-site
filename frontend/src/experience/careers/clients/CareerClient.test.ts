import type {JobPostingDetail} from "@/experience/careers/types/department.ts";
import {getJobPostingById} from "@/experience/careers/clients/CareersClient.ts";

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

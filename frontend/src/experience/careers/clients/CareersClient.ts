//THIS FILE GOES AND GET EVERY DEPARTMENT FROM THE BACKEND

import type {
    DepartmentDetail,
    DepartmentSummary,
    JobApplicationRequest, JobApplicationResponse,
    JobPostingDetail
} from "@/experience/careers/types/department";

//Promise - means it will hand back list of departments eventually.
export async function getAllDepartments(): Promise<DepartmentSummary[]> {
    //GO GET CAREERS - HAVE IT MATCH CONTROLLER ON BACKEND
    const response = await fetch("/api/careers");
    //SEND BACK RAW DATA
    return response.json();

}
export async function getDepartmentBySlug(slug: string): Promise<DepartmentDetail> {
    const response = await fetch(`/api/careers/${slug}`);
    return response.json();
}
export async function getJobPostingById(id: number): Promise<JobPostingDetail> {
    const response = await fetch(`/api/careers/jobs/${id}`);
    return response.json();
}
export async function createJobApplication(
    application: JobApplicationRequest
): Promise<JobApplicationResponse> {

    const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(application)
    });

    if (!response.ok) {
        throw new Error("Failed to submit job application");
    }

    return response.json();
}


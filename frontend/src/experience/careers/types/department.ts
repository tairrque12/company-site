//SMALL SUMMARY FOR DEPARTMENT PAGE
export interface JobPosting {
    id: number;
    title: string;
    location: string;
    remote: boolean;
}

export interface Team {
    name: string;
    slug: string;
    jobPostings: JobPosting[]
}

//CAREER PAGE CARDS - GETS ALL DEPARTMENTS
export interface DepartmentSummary {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    imageUrl: string;
}

//HAS EVERYTHING DEPARTMENT HAS PLUS TEAMS
export interface DepartmentDetail extends DepartmentSummary {
    teams: Team[];
}

//FULL JOB POSTING DETAIL
export interface JobPostingDetail{
        id: number;
        title: string;
        location: string;
        jobType: string;
        reqId: string;
        aboutRole: string;
        responsibilities: string;
        requirements: string;
        bonusQualifications: string;
        salaryMin: number;
        salaryMax: number;
        teamName: string;
        departmentName: string;
}
//WHAT THE USER SUBMITS
export interface JobApplicationRequest{
    jobPostingId: number;
    firstName: string;
    lastName: string;
    preferredFirstName: string;
    email: string;
    country: string;
    phone: string;
    city: string;
    linkedinUrl?: string;
    websiteUrl?: string;
}
//CONFIRMATION TO USER IT HAS SUBMITTED
export interface JobApplicationResponse{
    id: number;
    firstName: string;
    lastName: string;
    jobPostingTitle: string;
    departmentName: string | null;
    submittedAt: string;
}
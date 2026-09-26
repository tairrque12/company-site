import {useEffect, useState} from "react";
import {getJobPostingById} from "@/experience/careers/clients/CareersClient";
import type {JobPostingDetail} from "@/experience/careers/types/department";
import {useNavigate, useParams, Link} from "react-router";

export function JobDetailPage() {
    // WHICH JOB?
    const {id, departmentSlug} = useParams();
    const navigate = useNavigate();

    // STORE THE JOB
    const [job, setJob] = useState<JobPostingDetail | null>(null);

    // GO GET THE JOB
    useEffect(() => {
        getJobPostingById(Number(id))
            .then((job) => {
                setJob(job);
            });
    }, [id]);

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <main className="min-h-screen bg-white text-black">

            {/* JOB HEADER */}
            <section className="border-b border-gray-200">
                <div className="mx-auto max-w-5xl px-6 py-16">

                    {/*BACK TO JOB POSTINGS */}
                    <Link
                        to={`/careers/${departmentSlug}`}
                        className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-black py-4"
                    >
                        ← Back to jobs
                    </Link>

                    <div className="flex items-start justify-between gap-8">

                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight">
                                {job.title}
                            </h1>

                            <p className="mt-4 text-gray-600">
                                {job.location}
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    `/careers/${departmentSlug}/jobs/${id}/apply`
                                )
                            }
                            className="rounded-full bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
                        >
                            Apply
                        </button>

                    </div>
                </div>
            </section>


            {/* JOB INFORMATION */}
            <div className="mx-auto max-w-5xl px-6 py-16">

                <div className="max-w-3xl space-y-14">

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            About The Role
                        </h2>

                        <p className="leading-8 text-gray-700">
                            {job.aboutRole}
                        </p>
                    </section>


                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Responsibilities
                        </h2>

                        <p className="leading-8 text-gray-700">
                            {job.responsibilities}
                        </p>
                    </section>


                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Requirements
                        </h2>

                        <p className="leading-8 text-gray-700">
                            {job.requirements}
                        </p>
                    </section>


                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Bonus Qualifications
                        </h2>

                        <p className="leading-8 text-gray-700">
                            {job.bonusQualifications}
                        </p>
                    </section>


                    <section className="border-t border-gray-200 pt-12">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Compensation
                        </h2>

                        <div className="space-y-4 leading-8 text-gray-700">
                            <p>
                                The US base salary range for this full-time
                                position is between {job.salaryMin} - {job.salaryMax} annually.
                            </p>

                            <p>
                                The pay offered for this position may vary based
                                on several individual factors, including
                                job-related knowledge, skills, and experience.
                            </p>

                            <p>
                                The total compensation package may also include
                                additional components/benefits depending on the
                                specific role. This information will be shared
                                if an employment offer is extended.
                            </p>
                        </div>
                    </section>

                </div>
            </div>

        </main>
    );
}
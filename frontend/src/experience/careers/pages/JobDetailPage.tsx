
import {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router";

import {getJobPostingById} from "@/experience/careers/clients/CareersClient";
import type {JobPostingDetail} from "@/experience/careers/types/department";
import {JobApplicationForm} from "@/experience/careers/components/JobApplicationForm";

export function JobDetailPage() {
    const {id, departmentSlug} = useParams();

    const [job, setJob] = useState<JobPostingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    const applicationRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setLoadError(false);
        setJob(null);

        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            setLoading(false);
            setLoadError(true);
            return;
        }

        getJobPostingById(Number(id))
            .then((jobPosting) => {
                if (!cancelled) {
                    setJob(jobPosting);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setLoadError(true);
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleApply = () => {
        applicationRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl px-6 py-20">
                <p className="text-gray-500">Loading job details...</p>
            </div>
        );
    }

    if (loadError || !job) {
        return (
            <div className="mx-auto max-w-5xl px-6 py-20">
                <h1 className="text-2xl font-semibold">
                    Unable to load this job
                </h1>
                <Link
                    to="/careers"
                    className="mt-4 inline-block underline"
                >
                    Return to careers
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">

            {/* JOB HEADER */}
            <section className="border-b border-gray-200">
                <div className="mx-auto max-w-5xl px-6 py-16">

                    <Link
                        to={`/careers/${departmentSlug}`}
                        className="inline-flex py-4 text-sm font-medium text-gray-600 transition hover:text-black"
                    >
                        ← Back to jobs
                    </Link>

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight">
                                {job.title}
                            </h1>

                            <p className="mt-4 text-gray-600">
                                {job.location}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleApply}
                            className="shrink-0 rounded-md bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                        >
                            Apply For This Job
                        </button>

                    </div>
                </div>
            </section>

            {/* JOB DESCRIPTION */}
            <div className="mx-auto max-w-5xl px-6 py-16">

                <div className="max-w-3xl space-y-14">

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            About The Role
                        </h2>
                        <p className="whitespace-pre-line leading-8 text-gray-700">
                            {job.aboutRole}
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Responsibilities
                        </h2>
                        <p className="whitespace-pre-line leading-8 text-gray-700">
                            {job.responsibilities}
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Requirements
                        </h2>
                        <p className="whitespace-pre-line leading-8 text-gray-700">
                            {job.requirements}
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Bonus Qualifications
                        </h2>
                        <p className="whitespace-pre-line leading-8 text-gray-700">
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
                                The pay offered for this position may vary
                                based on several individual factors, including
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

            {/* APPLICATION SECTION - ALWAYS VISIBLE */}
            <section
                ref={applicationRef}
                id="job-application"
                className="scroll-mt-44 border-t border-gray-200 bg-gray-50"
            >
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="max-w-3xl">
                        <JobApplicationForm
                            key={job.id}
                            jobPostingId={job.id}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}

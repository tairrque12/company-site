
import {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createJobApplication} from "../clients/CareersClient";

const schema = yup.object({
    firstName: yup.string()
        .required("First Name Is Required"),

    lastName: yup.string()
        .required("Last Name Is Required"),

    preferredFirstName: yup.string().optional(),

    email: yup.string()
        .email("Please Enter A Valid Email")
        .required("Email Is Required"),

    country: yup.string()
        .required("Country Is Required"),

    phone: yup.string()
        .required("Phone Is Required"),

    city: yup.string()
        .required("City Is Required"),

    linkedinUrl: yup.string().optional(),

    websiteUrl: yup.string().optional(),
});

type FormValues = yup.InferType<typeof schema>;

interface JobApplicationFormProps {
    jobPostingId: number;
}

const inputClassName =
    "mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

const labelClassName =
    "block text-sm font-medium text-gray-800";

const errorClassName =
    "mt-2 text-sm text-red-600";

export function JobApplicationForm({
                                       jobPostingId
                                   }: JobApplicationFormProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormValues) => {
        setSubmissionError(null);

        const request = {
            ...data,
            jobPostingId,
            preferredFirstName: data.preferredFirstName ?? "",
            linkedinUrl: data.linkedinUrl ?? "",
            websiteUrl: data.websiteUrl ?? ""
        };

        try {
            await createJobApplication(request);
            setIsSubmitted(true);
        } catch {
            setSubmissionError(
                "Unable to submit application. Please try again."
            );
        }
    };

    if (isSubmitted) {
        return (
            <section
                role="status"
                className="rounded-xl border border-gray-200 bg-white p-10 shadow-sm"
            >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-700">
                    <span aria-hidden="true" className="text-2xl">✓</span>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                    Application Submitted Successfully
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                    Thank you for applying. Your application has been received.
                </p>
            </section>
        );
    }

    return (
        <div>
            {/* FORM HEADING */}
            <div className="mb-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Careers / Application
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
                    Apply For This Job
                </h1>

                <p className="mt-4 max-w-xl leading-7 text-gray-600">
                    Interested in joining our team? Complete the form
                    below to submit your application.
                </p>

                <p className="mt-3 text-sm text-gray-500">
                    Fields marked with * are required.
                </p>
            </div>

            {/* APPLICATION FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
            >
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h2 className="text-lg font-semibold">
                        Personal Information
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Tell us a little about yourself.
                    </p>
                </div>

                {submissionError && (
                    <div
                        role="alert"
                        className="mb-8 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {submissionError}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">

                    {/* FIRST NAME */}
                    <div>
                        <label htmlFor="firstName" className={labelClassName}>
                            First Name <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            className={inputClassName}
                            aria-invalid={!!errors.firstName}
                            {...register("firstName")}
                        />

                        {errors.firstName && (
                            <p role="alert" className={errorClassName}>
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    {/* LAST NAME */}
                    <div>
                        <label htmlFor="lastName" className={labelClassName}>
                            Last Name <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            className={inputClassName}
                            aria-invalid={!!errors.lastName}
                            {...register("lastName")}
                        />

                        {errors.lastName && (
                            <p role="alert" className={errorClassName}>
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    {/* PREFERRED FIRST NAME */}
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="preferredFirstName"
                            className={labelClassName}
                        >
                            Preferred First Name
                            <span className="ml-2 font-normal text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <input
                            id="preferredFirstName"
                            type="text"
                            autoComplete="nickname"
                            className={inputClassName}
                            {...register("preferredFirstName")}
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label htmlFor="email" className={labelClassName}>
                            Email <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={inputClassName}
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />

                        {errors.email && (
                            <p role="alert" className={errorClassName}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label htmlFor="phone" className={labelClassName}>
                            Phone <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="(555) 123-4567"
                            className={inputClassName}
                            aria-invalid={!!errors.phone}
                            {...register("phone")}
                        />

                        {errors.phone && (
                            <p role="alert" className={errorClassName}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* COUNTRY */}
                    <div>
                        <label htmlFor="country" className={labelClassName}>
                            Country <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="country"
                            type="text"
                            autoComplete="country-name"
                            className={inputClassName}
                            aria-invalid={!!errors.country}
                            {...register("country")}
                        />

                        {errors.country && (
                            <p role="alert" className={errorClassName}>
                                {errors.country.message}
                            </p>
                        )}
                    </div>

                    {/* CITY */}
                    <div>
                        <label htmlFor="city" className={labelClassName}>
                            City <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            className={inputClassName}
                            aria-invalid={!!errors.city}
                            {...register("city")}
                        />

                        {errors.city && (
                            <p role="alert" className={errorClassName}>
                                {errors.city.message}
                            </p>
                        )}
                    </div>

                </div>

                {/* PROFESSIONAL LINKS */}
                <div className="mt-10 border-t border-gray-100 pt-8">

                    <h2 className="text-lg font-semibold">
                        Professional Links
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Share your professional profile or portfolio.
                        These fields are optional.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2">

                        <div>
                            <label
                                htmlFor="linkedinUrl"
                                className={labelClassName}
                            >
                                Linkedin Url
                            </label>

                            <input
                                id="linkedinUrl"
                                type="url"
                                placeholder="https://linkedin.com/in/..."
                                className={inputClassName}
                                {...register("linkedinUrl")}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="websiteUrl"
                                className={labelClassName}
                            >
                                Website Url
                            </label>

                            <input
                                id="websiteUrl"
                                type="url"
                                placeholder="https://yourportfolio.com"
                                className={inputClassName}
                                {...register("websiteUrl")}
                            />
                        </div>

                    </div>
                </div>

                {/* SUBMISSION */}
                <div className="mt-10 border-t border-gray-100 pt-8">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Application"}
                    </button>

                    <p className="mt-4 text-xs leading-6 text-gray-500">
                        Please review your information before submitting.
                    </p>

                </div>

            </form>
        </div>
    );
}

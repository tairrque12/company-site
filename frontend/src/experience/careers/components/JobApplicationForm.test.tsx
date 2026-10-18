import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {afterEach, describe, expect, it, vi} from "vitest";

import {JobApplicationForm} from "./JobApplicationForm";
import {createJobApplication} from "../clients/CareersClient";

// Mock the API client so tests do not make real HTTP requests.
vi.mock("../clients/CareersClient", () => ({
    createJobApplication: vi.fn()
}));

// Reusable helper for rendering the form with a job posting ID.
const renderJobApplicationForm = (jobPostingId: number = 5) => {
    return render(
        <JobApplicationForm jobPostingId={jobPostingId}/>
    );
};

// Clear recorded mock calls between tests.
afterEach(() => {
    vi.clearAllMocks();
});

describe("JobApplicationForm", () => {

    // TEST 1: Form heading
    it("should render job app heading", () => {
        renderJobApplicationForm();
        expect(
            screen.getByRole("heading", {
                name: /apply for this job/i
            })
        ).toBeInTheDocument();
    });
    // TEST 2: Form fields
    it("should render form input fields", () => {
        renderJobApplicationForm();
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Preferred First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
        expect(screen.getByLabelText("Phone")).toBeInTheDocument();
        expect(screen.getByLabelText("City")).toBeInTheDocument();
        expect(screen.getByLabelText("Linkedin Url")).toBeInTheDocument();
        expect(screen.getByLabelText("Website Url")).toBeInTheDocument();
    });
    // TEST 3: Typing into the form
    it("should allow a user to type their information", async () => {
        // ARRANGE
        const user = userEvent.setup();
        renderJobApplicationForm();
        const firstNameInput = screen.getByLabelText("First Name");
        // ACT
        await user.type(firstNameInput, "Tairrque");
        // ASSERT
        expect(firstNameInput).toHaveValue("Tairrque");
    });
    // TEST 4: Required field validation
    it("should show validation errors when input fields are empty", async () => {
        // ARRANGE
        const user = userEvent.setup();
        renderJobApplicationForm();
        // ACT
        await user.click(
            screen.getByRole("button", {
                name: /submit application/i
            })
        );
        // ASSERT
        expect(
            await screen.findByText("First Name Is Required")
        ).toBeInTheDocument();
        expect(screen.getByText("Last Name Is Required")).toBeInTheDocument();
        expect(screen.getByText("Email Is Required")).toBeInTheDocument();
        expect(screen.getByText("Country Is Required")).toBeInTheDocument();
        expect(screen.getByText("Phone Is Required")).toBeInTheDocument();
        expect(screen.getByText("City Is Required")).toBeInTheDocument();
    });
    // TEST 5: Invalid email validation
    it("should show validation error when email format is incorrect", async () => {
        // ARRANGE
        const user = userEvent.setup();
        renderJobApplicationForm();
        // ACT
        await user.type(screen.getByLabelText("First Name"), "Tairrque");
        await user.type(screen.getByLabelText("Last Name"), "Baker");
        await user.type(screen.getByLabelText("Email"), "notAnEmail");
        await user.click(
            screen.getByRole("button", {
                name: /submit application/i
            })
        );
        // ASSERT
        expect(
            await screen.findByText("Please Enter A Valid Email")
        ).toBeInTheDocument();
    });
    // TEST 6: Correct application request
    it("should submit an application for the selected job", async () => {
        // ARRANGE
        const user = userEvent.setup();

        vi.mocked(createJobApplication).mockResolvedValue({
            id: 100,
            firstName: "Tairrque",
            lastName: "Baker",
            jobPostingTitle: "Robotics Software Engineer",
            departmentName: "Engineering",
            submittedAt: "2026-10-04T13:00:00"
        });

        renderJobApplicationForm(10);
        // ACT
        await user.type(screen.getByLabelText("First Name"), "Tairrque");
        await user.type(screen.getByLabelText("Last Name"), "Baker");
        await user.type(screen.getByLabelText("Email"), "test@example.com");
        await user.type(screen.getByLabelText("Country"), "United States");
        await user.type(screen.getByLabelText("Phone"), "334-820-9553");
        await user.type(screen.getByLabelText("City"), "Lanett");
        await user.click(
            screen.getByRole("button", {
                name: /submit application/i
            })
        );
        // ASSERT
        await waitFor(() => {
            expect(createJobApplication).toHaveBeenCalledWith({
                jobPostingId: 10,
                firstName: "Tairrque",
                lastName: "Baker",
                preferredFirstName: "",
                email: "test@example.com",
                country: "United States",
                phone: "334-820-9553",
                city: "Lanett",
                linkedinUrl: "",
                websiteUrl: ""
            });
        });
    });

    // TEST 7: Successful submission
    it("should display a success message after submitting an application", async () => {
        // ARRANGE
        const user = userEvent.setup();
        vi.mocked(createJobApplication).mockResolvedValue({
            id: 100,
            firstName: "Tairrque",
            lastName: "Baker",
            jobPostingTitle: "Robotics Software Engineer",
            departmentName: "Engineering",
            submittedAt: "2026-10-12T13:00:00"
        });

        renderJobApplicationForm(10);
        // ACT
        await user.type(screen.getByLabelText("First Name"), "Tairrque");
        await user.type(screen.getByLabelText("Last Name"), "Baker");
        await user.type(screen.getByLabelText("Email"), "test@example.com");
        await user.type(screen.getByLabelText("Country"), "United States");
        await user.type(screen.getByLabelText("Phone"), "334-820-9553");
        await user.type(screen.getByLabelText("City"), "Lanett");

        await user.click(
            screen.getByRole("button", {
                name: /submit application/i
            })
        );
        // ASSERT
        expect(
            await screen.findByRole("status")
        ).toHaveTextContent("Application Submitted Successfully");
        expect(createJobApplication).toHaveBeenCalledTimes(1);
    });

    // TEST 8: Failed submission
    it("should display an error when the application submission fails", async () => {
        // ARRANGE
        const user = userEvent.setup();

        vi.mocked(createJobApplication).mockRejectedValue(
            new Error("Failed to submit job application")
        );

        renderJobApplicationForm(10);
        // ACT
        await user.type(screen.getByLabelText("First Name"), "Tairrque");
        await user.type(screen.getByLabelText("Last Name"), "Baker");
        await user.type(screen.getByLabelText("Email"), "test@example.com");
        await user.type(screen.getByLabelText("Country"), "United States");
        await user.type(screen.getByLabelText("Phone"), "334-820-9553");
        await user.type(screen.getByLabelText("City"), "Lanett");

        await user.click(
            screen.getByRole("button", {
                name: /submit application/i
            })
        );
        // ASSERT
        expect(
            await screen.findByRole("alert")
        ).toHaveTextContent(
            "Unable to submit application. Please try again."
        );
        expect(
            screen.getByRole("button", {
                name: /submit application/i
            })
        ).toBeEnabled();
    });
    it('should render a form field titled how did you hear about us ', () => {
        renderJobApplicationForm();
        expect(screen.getByLabelText('How Did You Hear About Us?')).toBeInTheDocument();
    });
    it('should render a dropdown with select criteria', () => {
        renderJobApplicationForm();
        const options = screen.getAllByRole('option');
        expect(screen.getByRole('combobox', {name: /how did you hear about us/i})).toBeInTheDocument();
        expect(options).toHaveLength(6);
        expect(screen.getByRole('option', {name: /LinkedIn/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: /Company Website/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: /Employee Referral/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: /Job Fair/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: /Other/i})).toBeInTheDocument();
    });
    it('should display the selected referral source', async () => {
        //ARRANGE
        const user = userEvent.setup();
        renderJobApplicationForm();
        const dropdown = screen.getByRole('combobox', {name:/how did you hear about us/i})
        //ACT
        await user.selectOptions(dropdown, "LinkedIn")
        //ASSERT
        expect(dropdown).toHaveValue("LinkedIn");
        //ACT
        await user.selectOptions(dropdown, "Company Website")
        //ASSERT
        expect(dropdown).toHaveValue("Company Website")

    });
    it('should fill the form field with the selected criteria when a criteria is clicked', () => {

    });
    it('should save the application with selected criteria when submit is clicked', () => {

    });
    it('should not submit application when referralType is not selected', () => {

    });
    it('should render a success message when application is successfully committed', () => {

    });
    it('should render a validation error when user does not select a referral type and attempts to submit  ', () => {

    });

});


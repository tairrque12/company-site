import {render, screen} from "@testing-library/react";
import {JobApplicationForm} from "@/experience/careers/components/JobApplicationForm.tsx";
import {expect} from "vitest";
import userEvent from "@testing-library/user-event";

describe('JobApplicationForm', () => {
    it('should render job app heading ', () => {
        render(<JobApplicationForm/>);
        expect(screen.getByRole('heading', {name: /apply for this job/i})).toBeInTheDocument()
    });
    it('should render form input fields', () => {
        render(<JobApplicationForm/>)
        expect(screen.getByLabelText('First Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Preferred First Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Country')).toBeInTheDocument()
        expect(screen.getByLabelText('Phone')).toBeInTheDocument()
        expect(screen.getByLabelText('City')).toBeInTheDocument()
        expect(screen.getByLabelText('Linkedin Url')).toBeInTheDocument()
        expect(screen.getByLabelText('Website Url')).toBeInTheDocument()
    });
    it('should allow a user to type their information', async () => {
        render(<JobApplicationForm/>)
        const user = userEvent.setup()
        const firstNameInput = screen.getByLabelText('First Name');
        await user.type(firstNameInput, "Tairrque");
        expect(firstNameInput).toHaveValue("Tairrque")
    });
    it('should show validation errors when input fields are empty', async () => {
        render(<JobApplicationForm/>)
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name:/submit application/i}))
        expect(await screen.findByText('First Name Is Required')).toBeInTheDocument()
        expect(await screen.findByText('Last Name Is Required')).toBeInTheDocument()
    });
});
    it('should show validation error when email format is incorrect', async () => {
        //ARRANGE
        render(<JobApplicationForm/>)
        //THIS IS SETTING UP USER
        const user = userEvent.setup();
        const firstNameInput = screen.getByLabelText('First Name')
        const lastNameInput = screen.getByLabelText('Last Name')
        const emailInput = screen.getByLabelText('Email')

        //ACT
        await user.type(firstNameInput, 'Tairrque')
        await user.type(lastNameInput, 'Baker')

        await user.type(emailInput, 'notAnEmail')
        await user.click(screen.getByRole('button', {name: /submit application/i}))

        //ASSERT
        expect(await screen.findByText('Please Enter A Valid Email')).toBeInTheDocument();
    });
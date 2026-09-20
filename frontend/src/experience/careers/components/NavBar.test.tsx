import {describe, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Navbar} from "@/experience/careers/components/Navbar.tsx";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router";

//MEMORY ROUTER
const renderNavbar = () =>{
    render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    )
}
//OPEN NAVBAR
const openNavbar = async () => {
    const menuTrigger = screen.getByRole('button', {name:/MENU/i})
    await userEvent.click(menuTrigger)
}
//CLOSE NAVBAR
const closeNavbar = async () =>{
    const closeTrigger = screen.getByRole('button', {name:/CLOSE/i})
    await userEvent.click(closeTrigger);
}

describe('NavBar', () => {
    it('should display the menu button', () => {
        renderNavbar()
        expect(screen.getByRole('button', {name:/MENU/i})).toBeInTheDocument();
    });
    it('should open when menu is clicked', async () => {
        renderNavbar();
        await openNavbar();
        expect(screen.getByText('HOME')).toBeInTheDocument();
    });
    it('should close navbar when close is clicked', async () => {
        renderNavbar();
        await openNavbar();
        expect(screen.getByText('HOME')).toBeInTheDocument();
        await closeNavbar();
        expect(screen.queryByText('HOME')).not.toBeInTheDocument();
    });
    it('should display all navbar links when expanded', async () => {
        renderNavbar();
        await (openNavbar());
        expect(screen.getByText('HOME')).toBeInTheDocument();
        expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
        expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument();
        expect(screen.getByText('CAREERS')).toBeInTheDocument();
        expect(screen.getByText('ABOUT')).toBeInTheDocument();
    });
    it('should provide a link to the careers page', async () => {
        renderNavbar();
        const menuTrigger = screen.getByRole('button', {name:/MENU/i})
        await userEvent.click(menuTrigger);
        const careerNav = screen.getByRole('link', {name:/CAREERS/i})
        expect(careerNav).toHaveAttribute('href', '/careers/')
    });
    it('should hide all navbar options by default', () => {
        renderNavbar();
        expect(screen.queryByText('HOME')).not.toBeInTheDocument();
    });
    it('should render RIQ AI Logo', () => {
        renderNavbar();
       expect(screen.getByRole('img', {name:/RIQ AI/i})).toBeInTheDocument();
    });
    it('should render Company button in the navbar', () => {
        renderNavbar()
        expect(screen.getByRole('button', {name:/COMPANY/i})).toBeInTheDocument()
    });
    it('should open the navbar from the top', async () => {
        renderNavbar();
        await openNavbar();
        const navbar = screen.getByRole('dialog')
        expect(navbar).toHaveAttribute('data-side', 'top');
    });
    it('should keep header content visible when navbar is expanded', async () => {
        renderNavbar();
        await openNavbar();
        expect(screen.getByText('HOME')).toBeInTheDocument();
        expect(screen.getByRole('img', {name:/RIQ AI/i})).toBeVisible();
        expect(screen.getByRole('button', {name:/COMPANY/i})).toBeVisible();
    });
    it('should hide menu button when navbar is expanded', async () => {
        renderNavbar()
        await openNavbar();
        expect(screen.queryByRole('button', {name:/MENU/i})).not.toBeInTheDocument();
    });
    it('should change menu to close when navbar is opened', async () => {
        renderNavbar();
        await openNavbar()
        expect(screen.getByRole('button', {name:/CLOSE/i})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name:/MENU/i})).not.toBeInTheDocument();
    });
})
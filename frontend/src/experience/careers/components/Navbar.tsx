import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { useState } from "react";

const navItems = [
    { label: "HOME", path: "/" },
    { label: "PRODUCTS", path: "/products" },
    { label: "TECHNOLOGY", path: "/technology" },
    { label: "CAREERS", path: "/careers/" },
    { label: "ABOUT", path: "/about" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
            modal={false}
        >
            {/* Persistent Header */}
            <header
                className="
                    fixed top-0 left-0 z-[60]
                    flex h-20 w-full items-center
                    bg-[#1f1d1d]
                    px-8
                    text-white
                "
            >
                {/* Logo */}
                <img
                    src="/pics/companyLogo.jpeg"
                    alt="RIQ AI"
                    className="h-10 w-auto object-contain bg-transparent"
                />

                {/* Center Menu / Close */}
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="
                            absolute left-1/2 -translate-x-1/2
                            text-xs font-medium text-white
                            hover:bg-neutral-800 hover:text-white
                        "
                    >
                        {isOpen ? "CLOSE" : "MENU"}
                    </Button>
                </SheetTrigger>

                {/* Company Button */}
                <Button
                    variant="outline"
                    className="
                        ml-auto
                        border-white
                        bg-transparent
                        text-xs font-bold text-white
                        hover:bg-white hover:text-black
                    "
                >
                    COMPANY
                </Button>
            </header>

            {/* Expanded Navigation */}
            <SheetContent
                side="top"
                showCloseButton={false}
                className="
                    !top-20
                    h-auto
                    border-none
                    bg-[#1f1d1d]
                    px-10
                    py-10
                    text-white
                "
            >
                <div
                    className="
                        grid
                        grid-cols-[1fr_1fr_1.2fr]
                        gap-16
                    "
                >
                    {/* Left Column - Main Navigation */}
                    <nav className="flex flex-col items-start gap-5">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="
                                    group
                                    flex items-center
                                    text-3xl font-medium
                                    tracking-tight
                                    transition-all
                                    hover:translate-x-2
                                "
                            >
                                <span
                                    className="
                                        mr-0
                                        h-2 w-2
                                        rounded-full
                                        bg-white
                                        opacity-0
                                        transition-all
                                        group-hover:mr-3
                                        group-hover:opacity-100
                                    "
                                />

                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Center Column */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="mb-5 text-xl font-bold">
                                RIQ AI
                            </h2>

                            <div className="flex flex-col gap-3 text-sm">
                                <p>AUTONOMOUS SYSTEMS</p>
                                <p>INTELLIGENT MACHINES</p>
                                <p>ROBOTICS</p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <p className="mb-2 text-xs font-bold">
                                OUR MISSION:
                            </p>

                            <div className="flex items-center gap-2 text-xs">
                                <span className="h-2 w-2 rounded-full bg-white" />

                                <span>
                                    BUILDING INTELLIGENT MACHINES
                                </span>
                            </div>
                        </div>
                    </div>


                    </div>
            </SheetContent>
        </Sheet>
    );
}
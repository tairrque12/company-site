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
                    bg-black px-8
                "
            >
                {/* Logo */}
                <img
                    src="/pics/companyLogo.jpeg"
                    alt="RIQ AI"
                    className="h-10 w-auto object-contain"
                />

                {/* Center Menu / Close */}
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="
                            absolute left-1/2 -translate-x-1/2
                            text-xs font-medium text-white
                            hover:bg-neutral-900 hover:text-white
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
                        border-white bg-transparent
                        text-xs font-medium text-white
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
                    h-[calc(100vh-5rem)]
                    border-none
                    bg-black
                    px-10 py-12
                    text-white
                "
            >
                <div className="flex h-full flex-col justify-between">

                    <nav className="flex flex-col items-start gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="
                                    group
                                    flex items-center
                                    text-4xl font-medium
                                    tracking-tight
                                    transition-all
                                    hover:translate-x-2
                                    md:text-5xl
                                "
                            >
                                <span
                                    className="
                                        mr-0 h-2 w-2
                                        rounded-full bg-white
                                        opacity-0
                                        transition-all
                                        group-hover:mr-4
                                        group-hover:opacity-100
                                    "
                                />

                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-end justify-between border-t border-neutral-800 pt-6 mt-6">
                        <div>
                            <p className="text-xs text-neutral-500">
                                RIQ AI
                            </p>

                            <p className="mt-1 text-sm text-neutral-300">
                                Building intelligent machines.
                            </p>
                        </div>

                        <p className="text-xs text-neutral-500">
                            AUTONOMOUS SYSTEMS
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
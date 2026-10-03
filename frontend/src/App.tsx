
import {Routes, Route} from "react-router";

import {CareersPage} from "@/experience/careers/pages/CareersPage";
import {DepartmentPage} from "@/experience/careers/pages/DepartmentPage";
import {Navbar} from "@/experience/careers/components/Navbar.tsx";
import {JobDetailPage} from "@/experience/careers/pages/JobDetailPage.tsx";

// New import
import {JobApplicationForm} from "@/experience/careers/components/JobApplicationForm.tsx";

function App() {

    return (
        <>
            <Navbar/>

            <main className="pt-40">

                <Routes>

                    <Route
                        path="/careers"
                        element={<CareersPage />}
                    />

                    <Route
                        path="/careers/:slug"
                        element={<DepartmentPage />}
                    />

                    <Route
                        path="/careers/:departmentSlug/jobs/:id"
                        element={<JobDetailPage />}
                    />

                    {/* Temporary application preview */}
                    <Route
                        path="/careers/application-preview"
                        element={<JobApplicationForm />}
                    />

                    <Route
                        path="/navbar"
                        element={<Navbar />}
                    />

                </Routes>

            </main>
        </>
    );
}

export default App;

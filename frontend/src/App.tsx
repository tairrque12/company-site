import {Routes, Route} from "react-router";
import {CareersPage} from "@/experience/careers/pages/CareersPage";
import {DepartmentPage} from "@/experience/careers/pages/DepartmentPage";
import {Navbar} from "@/experience/careers/components/Navbar.tsx";
import {JobDetailPage} from "@/experience/careers/pages/JobDetailPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/careers" element={<CareersPage />} />

            <Route
                path="/careers/:slug"
                element={<DepartmentPage />}
            />

            <Route
                path="/careers/:departmentSlug/jobs/:id"
                element={<JobDetailPage />}
            />

            <Route path="/navbar" element={<Navbar />} />
        </Routes>
    );
}

export default App;
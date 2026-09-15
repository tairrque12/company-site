import { Routes, Route } from "react-router";
import { CareersPage } from "@/experience/careers/pages/CareersPage";
import { DepartmentPage } from "@/experience/careers/pages/DepartmentPage";

function App() {
  return (
      <Routes>
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:slug" element={<DepartmentPage />} />
      </Routes>
  );
}

export default App;
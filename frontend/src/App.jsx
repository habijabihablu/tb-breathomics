import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import TBPage from "./pages/TBPage";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
        <Route path="/" element={<DashboardLayout />}>

          {/* Pages inside layout */}
          <Route index element={<Home />} />
          <Route path="tb" element={<TBPage />} />
          <Route path="coming" element={<ComingSoon />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import "tachyons/css/tachyons.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ImportPage from "./components/ImportPage";
import TablePage from "./components/TablePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

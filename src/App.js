import "tachyons/css/tachyons.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ImportPage from "./components/ImportPage";
import TablePage from "./components/TablePage";
import DataProvider from "./components/DataProvider";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DataProvider>
                <TablePage />
              </DataProvider>
            }
          />
          <Route path="import" element={<ImportPage />} />
          <Route
            path="*"
            element={
              <div className="w-100 vh-100 flex flex-column items-center justify-center f-6">
                <div>NOT FOUND</div>
                <div>😿😿😿</div>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

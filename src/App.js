import "tachyons/css/tachyons.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ImportPage from "./pages/ImportPage";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import DataProvider from "./components/DataProvider";

function App() {
  return (
    <Router>
      <Header>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Header>
    </Router>
  );
}

export default App;

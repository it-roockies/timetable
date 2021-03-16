import { ErrorBoundary, Loading } from "carbon-components-react";
import { Suspense } from "react";
import "tachyons/css/tachyons.css";
import "./App.css";

import ErrorBoundaryFallback from "./components/ErrorBoundaryFallback";

import Router from "./Router";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <Suspense
        fallback={
          <Loading description="Active loading indicator" withOverlay={false} />
        }
      >
        <Router />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

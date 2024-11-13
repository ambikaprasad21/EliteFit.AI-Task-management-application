import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;

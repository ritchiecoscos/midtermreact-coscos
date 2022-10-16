import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import {
  Teachers,
  Analytics,
  Comment,
  Dashboard,
  
  ErrorPage,
} from "./pages";
import VenueSinglePage from "./view/VenueSinglePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
           

            <Route path="/venues/:id" element={<VenueSinglePage />} />

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./styles/style.css";
import "primereact/resources/themes/viva-light/theme.css";
import "primereact/resources/primereact.min.css";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ExternalDownload from "./components/ExternalDownload";
        
export default function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path="/" />
          <Route element={<ExternalDownload/>} path="/temp-link/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  )
};
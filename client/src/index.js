import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import EntryLogInPage from "./components/EntryLogInPage";
import SlotMachinePage from "./components/SlotMachine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<EntryLogInPage />} />
        <Route path="/slot-machine" element={<SlotMachinePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

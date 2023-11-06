import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import EntryLogInPage from "./components/EntryLogInPage";
import SlotMachinePage from "./components/SlotMachine";
import SlotMachine from "./components/LuckySlotMachine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<EntryLogInPage />} />
        <Route path="/slot-machine" element={<SlotMachinePage />} />
        <Route path="/second-slot-machine" element={<SlotMachine numberOfSlots={8} />} />
        <Route path="/" element={<Navigate to="/second-slot-machine" />} />
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./hooks/AuthProvider";
import { ModalProvider } from "./hooks/ModalContext";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Warga from "./pages/Warga";
import Rumah from "./pages/Rumah";
import Homepage from "./pages/Homepage";

import RumahDetail from "./pages/RumahDetail";
import Pengeluaran from "./pages/Pengeluaran";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {<Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/warga" element={<Warga />} />
          <Route path="/rumah" element={<Rumah />} />
          <Route path="/rumah-detail" element={<RumahDetail />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

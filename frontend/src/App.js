import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  useEffect(() => {
    axios
      .get(`${API}/`)
      .then(() => void 0)
      .catch(() => void 0);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background font-sans">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
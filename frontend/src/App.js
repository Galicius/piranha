import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CocktailsPage from "./pages/CocktailsPage";
import GalleryPage from "./pages/GalleryPage";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background font-sans">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/cocktajli" element={<CocktailsPage />} />
              <Route path="/galerija" element={<GalleryPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
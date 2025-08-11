import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const CocktailsPage = lazy(() => import("./pages/CocktailsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background font-sans">
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/cocktajli" element={<CocktailsPage />} />
                <Route path="/galerija" element={<GalleryPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
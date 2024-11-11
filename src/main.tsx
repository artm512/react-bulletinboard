import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThreadsNew } from "./pages/threads/new";
import { HeaderLayout } from "./layout/mainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/threads/new" element={<ThreadsNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

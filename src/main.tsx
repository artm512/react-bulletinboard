import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThreadsNew } from "./pages/threads/new";
import { ThreadsId } from "./pages/threads/:id";
import { HeaderLayout } from "./layout/mainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/threads/new" element={<ThreadsNew />} />
          <Route path="/threads/:id" element={<ThreadsId />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

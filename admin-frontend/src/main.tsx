import { createRoot } from 'react-dom/client'
import './index.css'
import AllRoutes from "./routes/index";
import { BrowserRouter } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from './context/AuthProvider';
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <HeroUIProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </HeroUIProvider>
  </AuthProvider>
  ,
)

import AccountProvider from "@/context/account/AccountProvider";
import { HeroUIProvider } from "@heroui/react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import AllRoutes from "./routes/index";
import ScrollToTop from "./ui/ScrollToTop";
// import ScrollToTop from "./ScrollToTop";
createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <AuthProvider>
      <HeroUIProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AllRoutes />
        </BrowserRouter>
      </HeroUIProvider>
    </AuthProvider>
  </AccountProvider>
)

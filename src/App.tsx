import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { BaseLayout } from './design-system/layouts/baseLayout'
import { Home } from './app/pages/home'
import { Carpentry } from './app/pages/services/carpentry'
import { Plumbing } from './app/pages/services/plumbing'
import { Masonry } from './app/pages/services/masonry'
import { Engineering } from './app/pages/services/engineering'
import { NotFound } from './app/pages/notFound'
import { Specials } from './app/pages/specials'
import { Pricing } from './app/pages/pricing'
import { FAQs } from './app/pages/faqs'
import { About } from './app/pages/about'
import { Quote } from './app/pages/quote'
import { SignUp } from './app/pages/signUp'
import { Login } from './app/pages/login'
import { AccountSettings } from './app/protectedPages/accountsSettings'
import { AuthProvider, ProtectedRoute } from './app/auth/proctectedRoute'
import { Electrical } from './app/pages/services/electrical'
import { Garden } from './app/pages/services/garden'
import { Services } from './app/pages/services/services'
import { LocationProvider } from "./app/context/LocationContext";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginTimestamp = Number(localStorage.getItem("loginTimestamp"));
    if (loginTimestamp && Date.now() - loginTimestamp > SESSION_DURATION_MS) {
      auth.signOut();
      localStorage.removeItem("loginTimestamp");
      navigate("/login"); // <-- This actually redirects
    }
  }, [navigate]);

  return (
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter basename="/trade-locator/">
          <Routes>
            <Route element={<BaseLayout id='base-layout' />}>
              <Route path="/" element={<Home />} />
              <Route path="/carpentry" element={<ProtectedRoute><Carpentry /></ProtectedRoute>} />
              <Route path="/engineering" element={<ProtectedRoute><Engineering /></ProtectedRoute>} />
              <Route path="/electrical" element={<ProtectedRoute><Electrical /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/garden" element={<ProtectedRoute><Garden /></ProtectedRoute>} />
              <Route path="/masonry" element={<ProtectedRoute><Masonry /></ProtectedRoute>} />
              <Route path="/plumbing" element={<Plumbing />} />
              <Route path="/specials" element={<Specials />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/about" element={<About />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* Authenticated routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="account-settings"
                element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </AuthProvider>
  )
}

export default App


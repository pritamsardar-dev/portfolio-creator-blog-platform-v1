import { useEffect, useState } from "react";

import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import ScrollToTop from "./components/common/ScrollToTop";

// Root app shell with auth initialization and layout
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Restore session on mount
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
    <div
      className={clsx(
        "min-h-screen",
        "bg-[var(--color-bg)] text-[var(--color-text)]",
        "transition-colors duration-300",
      )}
    >
      <ScrollToTop />

      {/* App Layout */}
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* Main Content */}
        <main className="min-h-dvh flex-1 px-4 sm:px-8 lg:px-12">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

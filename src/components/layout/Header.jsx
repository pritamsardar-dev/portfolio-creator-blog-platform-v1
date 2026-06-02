import { useState } from "react";

import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import HamburgerIcon from "../../assets/icons/HamburgerIcon";
import CrossFilledIcon from "../../assets/icons/CrossFilledIcon";
import Container from "./Container";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import LogoutBtn from "../auth/LogoutBtn";

// Sticky site header with responsive navigation and auth actions
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "All Posts", slug: "/all-posts" },
    { name: "My Posts", slug: "/my-posts" },
    { name: "Add Post", slug: "/add-post" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const navLinkClasses = ({ isActive }) =>
    clsx(
      "cursor-pointer rounded-xl",
      "px-4 py-2",
      "text-sm font-medium",
      "transition-all duration-200",
      isActive
        ? "bg-[var(--color-card-hover)] text-[var(--color-text)] shadow-sm"
        : "text-[var(--color-text-muted)] hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text)]",
    );

  const signupLinkClasses = ({ isActive }) =>
    clsx(
      "cursor-pointer rounded-xl",
      "px-4 py-2",
      "text-sm font-medium text-white!",
      "transition-all duration-200",
      isActive
        ? "bg-[var(--color-primary-hover)] text-white! shadow-sm"
        : "bg-[var(--color-primary)] text-white! hover:bg-[var(--color-primary-hover)]",
    );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50",
        "border-b border-[var(--color-border)]",
        "bg-[var(--color-bg)/80]",
        "backdrop-blur-xl",
      )}
    >
      {/* Header Wrapper */}
      <div className="px-4 md:px-6 lg:px-8">
        <Container>
          <nav className="flex h-16 items-center justify-between sm:h-[72px]">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-3 md:flex">
              <ul className="flex shrink-0 flex-wrap items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.name} className="shrink-0">
                    <NavLink to={item.slug} className={navLinkClasses}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Auth Actions */}
              <div className="flex shrink-0 items-center gap-3">
                {authStatus ? (
                  <LogoutBtn />
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClasses}>
                      Login
                    </NavLink>

                    <NavLink to="/signup" className={signupLinkClasses}>
                      Signup
                    </NavLink>
                  </>
                )}

                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={clsx(
                  "flex h-10 w-10 items-center justify-center",
                  "cursor-pointer rounded-xl",
                  "border border-[var(--color-border)]",
                  "bg-[var(--color-card)]",
                  "p-2 text-[var(--color-text)]",
                  "transition-all duration-200",
                  "hover:bg-[var(--color-card-hover)]",
                )}
              >
                {menuOpen ? <CrossFilledIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[var(--color-border)] md:hidden">
          <div className="px-4 py-4">
            <Container>
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        clsx(
                          "block cursor-pointer rounded-xl",
                          "px-4 py-3",
                          "text-sm font-medium",
                          "transition-all duration-200",
                          isActive
                            ? "bg-[var(--color-card-hover)] text-[var(--color-text)] shadow-sm"
                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text)]",
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

                {/* Mobile Auth Actions */}
                <div className="mt-3 flex flex-col gap-2">
                  {authStatus ? (
                    <LogoutBtn className="w-full justify-start" onClick={closeMenu} />
                  ) : (
                    <>
                      <NavLink to="/login" onClick={closeMenu} className={navLinkClasses}>
                        Login
                      </NavLink>

                      <NavLink to="/signup" onClick={closeMenu} className={signupLinkClasses}>
                        Signup
                      </NavLink>
                    </>
                  )}
                </div>
              </ul>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

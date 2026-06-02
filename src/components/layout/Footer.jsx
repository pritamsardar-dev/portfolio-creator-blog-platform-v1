import clsx from "clsx";
import { Link } from "react-router-dom";

import Container from "./Container";
import Logo from "../ui/Logo";

// Site footer with navigation and project info
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={clsx(
        "mt-20 border-t",
        "border-[var(--color-border)]",
        "bg-[var(--color-bg-secondary)]",
        "px-4 sm:px-6 lg:px-8",
      )}
    >
      <Container>
        {/* Top Section */}
        <div
          className={clsx(
            "grid grid-cols-1 items-start",
            "gap-10 py-10",
            "md:grid-cols-2",
            "lg:grid-cols-3 lg:gap-16",
          )}
        >
          {/* Brand Column */}
          <div className="flex flex-col">
            <Logo />

            <p
              className={clsx(
                "mt-4 max-w-xs",
                "text-sm leading-7",
                "text-[var(--color-text-muted)]",
              )}
            >
              A modern publishing platform designed for seamless writing, content sharing, and clean
              reading experiences.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col">
            <h3 className={clsx("mb-4", "text-sm font-semibold", "text-[var(--color-text)]")}>
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className={clsx(
                    "text-sm",
                    "text-[var(--color-text-muted)]",
                    "transition-colors duration-200",
                    "hover:text-[var(--color-text)]",
                  )}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className={clsx(
                    "text-sm",
                    "text-[var(--color-text-muted)]",
                    "transition-colors duration-200",
                    "hover:text-[var(--color-text)]",
                  )}
                >
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/add-post"
                  className={clsx(
                    "text-sm",
                    "text-[var(--color-text-muted)]",
                    "transition-colors duration-200",
                    "hover:text-[var(--color-text)]",
                  )}
                >
                  Add Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Details Column */}
          <div className="flex flex-col">
            <h3 className={clsx("mb-4", "text-sm font-semibold", "text-[var(--color-text)]")}>
              Project
            </h3>

            <ul className="space-y-3">
              <li className="text-sm text-[var(--color-text-muted)]">Content Publishing</li>

              <li className="text-sm text-[var(--color-text-muted)]">Rich Text Editor</li>

              <li className="text-sm text-[var(--color-text-muted)]">Responsive UI</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={clsx(
            "border-t border-[var(--color-border)]",
            "py-6 text-center",
            "text-sm text-[var(--color-text-muted)]",
          )}
        >
          © 2025-{currentYear} Creator Blog Platform V1 • Designed & Built by Pritam Sardar
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

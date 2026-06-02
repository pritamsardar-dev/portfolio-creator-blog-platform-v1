import { useEffect, useState } from "react";

import clsx from "clsx";

import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";
import { initializeTheme, toggleTheme } from "../../utils/theme";

// Light/dark mode toggle button synced to app theme
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const darkMode = initializeTheme();
    setIsDark(darkMode);
  }, []);

  const handleToggle = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    toggleTheme(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Theme"
      className={clsx(
        "flex h-10 w-10 items-center justify-center",
        "cursor-pointer rounded-full",
        "border border-[var(--color-border)]",
        "bg-[var(--color-card)] text-[var(--color-text)]",
        "p-2",
        "transition-all duration-300",
        "hover:scale-105 hover:bg-[var(--color-card-hover)]",
      )}
    >
      {isDark ? <SunIcon className="text-[18px]" /> : <MoonIcon className="text-[18px]" />}
    </button>
  );
}

export default ThemeToggle;

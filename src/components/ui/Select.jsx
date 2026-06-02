import { forwardRef, useEffect, useRef, useState } from "react";

import clsx from "clsx";

// Accessible custom select dropdown with keyboard-friendly trigger
function Select({ options = [], label, value, onChange, className = "" }, ref) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">{label}</label>
      )}

      <div className="relative">
        {/* Trigger */}
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen(!open)}
          className={clsx(
            "flex w-full items-center justify-between",
            "cursor-pointer rounded-2xl",
            "border border-[var(--color-border)]",
            "bg-[var(--color-card)]",
            "px-4 py-3",
            "text-sm font-medium text-[var(--color-text)]",
            "shadow-sm",
            "transition-all duration-200",
            "hover:border-[var(--color-primary)]",
            "focus:outline-none focus:ring-4 focus:ring-blue-500/10",
            className,
          )}
        >
          <span className="capitalize">{value || options[0]}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "h-4 w-4 text-[var(--color-text-muted)]",
              "transition-transform duration-200",
              open && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={clsx(
              "absolute left-0 top-full z-50",
              "mt-2 w-full",
              "overflow-hidden rounded-2xl",
              "border border-[var(--color-border)]",
              "bg-[var(--color-card)]",
              "shadow-2xl shadow-black/20",
              "backdrop-blur-xl",
            )}
          >
            {options.map((option) => {
              const isActive = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={clsx(
                    "flex w-full items-center justify-between",
                    "cursor-pointer px-4 py-3",
                    "text-left text-sm font-medium capitalize",
                    "transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-primary)]/15 text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text)]",
                  )}
                >
                  {option}
                  {isActive && <span>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Select);

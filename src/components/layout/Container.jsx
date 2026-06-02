import clsx from "clsx";

// Shared responsive page container
function Container({ children, className = "" }) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1400px]", "px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export default Container;

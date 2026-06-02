(function () {
  try {
    const savedTheme = localStorage.getItem("blog-theme");
    const isLight = savedTheme === "light";
    const bgColor = isLight ? "#f8fafc" : "#0f172a";
    const root = document.documentElement;

    // Apply light class for CSS theme targeting
    if (isLight) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }

    // Set background early to prevent flash of unstyled content
    root.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
  } catch {
    // Ignore theme read errors
  }
})();

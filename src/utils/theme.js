// Reads saved theme from storage and applies it to the document
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem("blog-theme");
  const isLight = savedTheme === "light";

  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.style.backgroundColor = isLight ? "#f8fafc" : "#0f172a";
  document.body.style.backgroundColor = isLight ? "#f8fafc" : "#0f172a";

  return !isLight;
};

// Applies the given theme and persists the preference to storage
export const toggleTheme = (isDark) => {
  const isLight = !isDark;

  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.style.backgroundColor = isLight ? "#f8fafc" : "#0f172a";
  document.body.style.backgroundColor = isLight ? "#f8fafc" : "#0f172a";

  localStorage.setItem("blog-theme", isDark ? "dark" : "light");
};

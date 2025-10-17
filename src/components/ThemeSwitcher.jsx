import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    "dark",
    "emerald",
    "caramellatte",
    "garden",
    "forest",
    "synthwave",
    "corporate",
    "cyberpunk",
    "dracula",
    "acid",
    "valentine",
    "black",
  ];

  return (
    <select
      className="select font-bold select-sm bg-base-200 text-sm focus:outline-none focus:ring-0 border-none shadow-none cursor-pointer"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;

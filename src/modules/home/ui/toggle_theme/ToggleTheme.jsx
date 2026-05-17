import React, { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedTheme = localStorage.getItem("theme-is") || "system";
      setTheme(selectedTheme);
      applyTheme(selectedTheme);
    }
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.removeAttribute("data-theme");
    }
    localStorage.setItem("theme-is", theme);
  };

  const obtenerValue = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div>
      <label>
        <select
          data-theme-picker
          name="themepicker"
          id="theme"
          style={{ width: 100, height: 30 }}
          onChange={obtenerValue}
          value={theme}
        >
          <option value="system"> 💻 Sistema</option>
          <option value="light"> ☀️ Light</option>
          <option value="dark"> ☪️ Dark</option>
        </select>
      </label>
    </div>
  );
}

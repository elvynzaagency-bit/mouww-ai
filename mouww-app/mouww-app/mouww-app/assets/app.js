// Mouww App — Global JavaScript

const Mouww = {

  version: "1.0.0",

  showToast(message) {
    let toast = document.getElementById("mouww-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "mouww-toast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "25px",
        transform: "translateX(-50%)",
        padding: "11px 18px",
        borderRadius: "20px",
        background: "#30253a",
        color: "#fff",
        fontSize: "13px",
        zIndex: "9999",
        boxShadow: "0 8px 25px rgba(0,0,0,.25)"
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
      toast.style.display = "none";
    }, 2200);
  },


  setTheme(theme) {

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem(
      "mouww-theme",
      theme
    );
  },


  toggleTheme() {

    const isDark =
      document.body.classList.contains("dark");

    this.setTheme(
      isDark ? "light" : "dark"
    );
  },


  getTheme() {

    return localStorage.getItem(
      "mouww-theme"
    ) || "light";
  },


  saveData(key, value) {

    localStorage.setItem(
      "mouww-" + key,
      JSON.stringify(value)
    );
  },


  getData(key, defaultValue = null) {

    const data =
      localStorage.getItem(
        "mouww-" + key
      );

    if (!data) {
      return defaultValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  },


  removeData(key) {

    localStorage.removeItem(
      "mouww-" + key
    );
  },


  isLoggedIn() {

    return !!localStorage.getItem(
      "mouww-session"
    );
  },


  logout() {

    localStorage.removeItem(
      "mouww-session"
    );

    this.showToast(
      "Logged out successfully 👋"
    );

    setTimeout(() => {

      window.location.href =
        "../login/login.html";

    }, 800);
  }

};


// Load saved theme

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const theme =
      Mouww.getTheme();

    Mouww.setTheme(theme);

  }
);

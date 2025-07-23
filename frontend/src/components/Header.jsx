import { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loginText, setLoginText] = useState("Login");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const resp = await fetch("/api/auth/profile");
        if (resp.ok) {
          const userData = await resp.json();
          setUser(userData);
          setLoginText(`Logout (${userData.name})`);
        } else {
          setLoginText("Login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setLoginText("Login");
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginClick = () => {
    if (user) {
      // Handle logout
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.src = "https://accounts.autodesk.com/Authentication/LogOut";
      document.body.appendChild(iframe);
      iframe.onload = () => {
        window.location.replace("/api/auth/logout");
        document.body.removeChild(iframe);
      };
    } else {
      // Handle login
      window.location.replace("/api/auth/login");
    }
  };

  return (
    <div
      id="header"
      className="flex justify-between items-center px-3 pb-3 bg-white shadow-sm"
    >
      <div className="flex items-center">
        <img
          className="logo h-8 mr-3"
          src="https://cdn.autodesk.io/logo/black/stacked.png"
          alt="Autodesk Platform Services"
        />
        <span className="title text-xl font-semibold text-gray-800">
          Hubs Browser
        </span>
      </div>
      <button
        id="login"
        name="login"
        onClick={handleLoginClick}
        className={`
          ${user !== null || loginText === "Login" ? "visible" : "invisible"}
          bg-slate-100
          text-black border-none px-5 py-2.5 rounded-md text-sm font-medium
          cursor-pointer transition-all duration-200 ease-in-out
          shadow-sm hover:shadow-md hover:-translate-y-0.5
        `}
      >
        {loginText}
      </button>
    </div>
  );
};

export default Header;

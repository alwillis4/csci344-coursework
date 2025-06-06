import React from "react";

function funcName() {
  alert("hi");
}

export default function NavBar({ username, logoutF }) {
  // This component is implemented for you:
  return (
    <nav className="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
      <h1 className="font-Comfortaa font-bold text-2xl">Photo App</h1>
      <ul className="flex gap-4 text-sm items-center justify-center">
        <li>
          <span>{username}</span>
        </li>
        <li>
          <a href="/logout" className="text-blue-700 py-2">
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  );
}

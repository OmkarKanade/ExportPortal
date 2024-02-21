import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header className="Header">
      <h1><a href="#">Admin Login</a></h1>
      <div className="HeaderButtons">
        <button className="HeaderButton">My Cart</button>
        <button className="HeaderButton">Logout</button>
      </div>
    </header>
  );
}

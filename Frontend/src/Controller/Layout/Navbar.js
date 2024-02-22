import React from "react";
import "./navbar.css";


export default function Navbar() {
  return (
    <header className="Header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8gPyOfRdsRtvKSGnT1tosE5gbhB7maF2XA&usqp=CAU"
        alt="no img"
        class="src"
      ></img>
      <div className="HeaderButtons">
        <a href="/" class="href">
          Home
        </a>
        <a href="" class="href">
          AboutUs
        </a>
        <label for="login">LoginAs</label>
        <select name="login" id="login">
          <option value="Admin"><a href="/loginadmin" class="href">Admin</a></option>
          <option value="Vendor"><a href="/vendor" class="href">Vendor</a></option>
          <option value="Customer">Customer</option>
        </select>
      </div>
    </header>
  );
}

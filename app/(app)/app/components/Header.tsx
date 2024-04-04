import React from "react";
import { FaBars } from "react-icons/fa";

function Header() {
  return (
    <div className="flex lg:hidden top-0 left-0 fixed justify-end">
      <div className="px-4">
        <label
          htmlFor="app-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <FaBars />
        </label>
      </div>
    </div>
  );
}

export default Header;

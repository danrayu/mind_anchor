import React from "react";
import UserDisplay from "./UserDisplay";
import Brand from "./Brand";

function Navbar() {
  return (
    <div className="navbar">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex-1">
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <Brand />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <UserDisplay />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

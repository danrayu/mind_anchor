'use client'
import React from "react";
import Brand from "./sidebar/Brand/Brand";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Brand />
        <li className="mt-2">
          <details open >
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Maps
            </summary>
            <ul>
              <li className="group">
                <span>Default</span>
              </li>
              <li className="group">
                <span>Morning</span>
              </li>
            </ul>
          </details>
        </li>
        <li className="mt-2">
        <details open >
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Ideas
            </summary>
            <ul>
              <li className="group">
                <span>+ New Idea</span>
              </li>
              <li className="group">
                <span><Link href={"/app/ideas"}>Manage</Link></span>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

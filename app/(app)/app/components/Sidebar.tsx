"use client";
import React from "react";
import Brand from "./sidebar/Brand";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchSidebar from "./sidebar/SearchSidebar";
function Sidebar() {
  const router = useRouter();

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Brand />
        <SearchSidebar/>
        <li className="mt-2">
          <details open>
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Mindscapes
            </summary>
            <ul>
              <li className="group" onClick={() => {
                  router.push("/app/mindscapes/new");
                }}>
                <span>+ New</span>
              </li>
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
          <details open>
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Memes
            </summary>
            <ul>
              <li className="group" onClick={() => {
                  router.push("/app/memes/new");
                }}>
                <span>+ New</span>
              </li>
              <li
                className="group"
                onClick={() => {
                  router.push("/app/memes");
                }}
              >
                <span>Manage</span>
              </li>
            </ul>
          </details>
        </li>
        <li className="mt-2">
          <details open>
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Categories
            </summary>
            <ul>
              <li className="group" onClick={() => {
                  router.push("/app/categories/new");
                }}>
                <span>+ New</span>
              </li>
              <li
                className="group"
                onClick={() => {
                  router.push("/app/categories");
                }}
              >
                <span>View All</span>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

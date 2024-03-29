"use client";
import React from "react";
import Brand from "./Brand";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { useMindscapesValid } from "@/app/util/stateValidationHooks";
import UserDisplay from "./UserDisplay";
import { FaBrain, FaHome, FaLightbulb, FaPlus } from "react-icons/fa"; // Example icon

function Sidebar() {
  const router = useRouter();
  const mindscapes = useAppSelector((state) => state.mindscapes);
  const mindscapesValid = useMindscapesValid();

  return (
    <div className="drawer-side">
      <label
        htmlFor="app-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Brand />
        <li className="mt-2 text-base">
          <details open>
            <summary className="group z-2">
              <span className="z-2">
                <FaHome className="text-white" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              General
            </summary>
            <ul>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/mindscapes");
                }}
              >
                <span className="z-2">Home</span>
              </li>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/mindscapes/manage");
                }}
              >
                <span className="z-2">Manage</span>
              </li>
            </ul>
            <summary className="group z-2">
              <span>
                <FaBrain className="text-white" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Mindscapes
            </summary>
            <ul>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/mindscapes/new");
                }}
              >
                <span>
                  <FaPlus className="w-[10px]" />
                  New
                </span>
              </li>

              {mindscapesValid &&
                mindscapes.mindscapes.map((mindscape: Mindscape) => {
                  return (
                    <li
                      className="group z-2"
                      key={"ms_" + mindscape.id}
                      onClick={() => {
                        router.push("/app/mindscapes/" + mindscape.id);
                      }}
                    >
                      <span>{mindscape.title}</span>
                    </li>
                  );
                })}
            </ul>
          </details>
        </li>
        <li className="mt-2 text-base">
          <details open>
            <summary className="group z-2">
              <span className="">
                <FaLightbulb className="text-white" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Memes
            </summary>
            <ul>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/memes/new");
                }}
              >
                <span>
                  <FaPlus className="w-[10px]" />
                  New
                </span>
              </li>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/memes");
                }}
              >
                <span>View All</span>
              </li>
              <li
                className="group z-2"
                onClick={() => {
                  router.push("/app/memes/categories");
                }}
              >
                <span>Categories</span>
              </li>
            </ul>
          </details>
        </li>

        <UserDisplay />
      </ul>
    </div>
  );
}

export default Sidebar;

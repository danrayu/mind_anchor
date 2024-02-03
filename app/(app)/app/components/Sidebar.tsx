"use client";
import React from "react";
import Brand from "./sidebar/Brand";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Searchbar from "./Searchbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/app/store/hooks";
import { useMindscapesValid } from "@/app/util/stateValidationHooks";

function Sidebar() {
  const router = useRouter();
  const { status, data: session, update: updateSession } = useSession();

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
        <Searchbar />
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
              <li
                className="group"
                onClick={() => {
                  router.push("/app/mindscapes/new");
                }}
              >
                <span>New</span>
              </li>
              {mindscapesValid &&
                mindscapes.mindscapes.map((mindscape: Mindscape) => {
                  return (
                    <li
                      className="group"
                      key={"ms_"+mindscape.id}
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
        <li className="mt-2">
          <details open>
            <summary className="group">
              <span>
                <Image src="/logo.png" width={20} height={20} alt="icon" />
                {/* <svg className="text-orange-400 h-5 w-5"></svg> */}
              </span>
              Collections
            </summary>
            <ul>
              <li
                className="group"
                onClick={() => {
                  router.push("/app/collections/new");
                }}
              >
                <span>New</span>
              </li>
              <li
                className="group"
                onClick={() => {
                  router.push("/app/collections");
                }}
              >
                <span>View All</span>
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
              <li
                className="group"
                onClick={() => {
                  router.push("/app/memes/new");
                }}
              >
                <span>New</span>
              </li>
              <li
                className="group"
                onClick={() => {
                  router.push("/app/memes");
                }}
              >
                <span>View All</span>
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
              <li
                className="group"
                onClick={() => {
                  router.push("/app/categories/new");
                }}
              >
                <span>New</span>
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
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <>
            <div className="font-bold">{session.user!.name}</div>
            <Link className="bottom-0 m-4" href={"/api/auth/signout"}>
              Logout
            </Link>
          </>
        )}
        {status === "unauthenticated" && (
          <Link className="bottom-0 m-4" href={"/api/auth/signin"}>
            Login
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;

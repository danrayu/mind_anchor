"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function UserDisplay() {
  const { status, data: session, update: updateSession } = useSession();

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <li className="text-base">
          <details>
            <summary className="font-semibold text-lg">
              {session.user!.name}
            </summary>
            <ul className="p-2 bg-base-100 rounded-t-none">
              <li>
                <Link className="underline" href={"/api/auth/signout"}>
                  Logout
                </Link>
              </li>
              <li>
                <Link className="underline" href={"/app"}>
                  Go to app
                </Link>
              </li>
            </ul>
          </details>
        </li>
      )}
      {status === "unauthenticated" && (
        <Link className="m-4 text-lg" href={"/api/auth/signin"}>
          Login
        </Link>
      )}
    </>
  );
}

export default UserDisplay;

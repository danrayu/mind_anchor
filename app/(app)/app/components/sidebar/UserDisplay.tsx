// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function UserDisplay() {
  // const { status, data: session, update: updateSession } = useSession();

  return (
    <div className="bottom-0 absolute w-full left-0 px-4 pb-4 text-base">
      <div className="divider"></div>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="avatar mask mask-squircle">
              {/* <Image
                src={session?.user?.image!}
                className="w-12"
                width={38}
                height={38}
                alt="user icon"
              /> */}
            </div>
            {/* <div className="font-semibold text-lg">{session.user!.name}</div> */}
          </div>
          <Link className="underline" href={"/api/auth/signout"}>
            Logout
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link className="m-4 text-lg" href={"/api/auth/signin"}>
          Login
        </Link>
      )}
    </div>
  );
}

export default UserDisplay;

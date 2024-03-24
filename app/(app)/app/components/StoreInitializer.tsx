"use client";
import { loadAll } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { useAllValid } from "@/app/util/stateValidationHooks";
// import { useSession } from "next-auth/react";


import React, { useEffect } from "react";
interface StoreInitializerProps {
  children: React.ReactNode;
}

function StoreInitializer({ children }: StoreInitializerProps) {
  const dispatch = useAppDispatch();
  const allValid = useAllValid();
  // const { status, data: session, update: updateSession } = useSession();

  // useEffect(() => {
  //   if (!allValid && session?.user) {
  //     console.log("loaded all");
  //     dispatch(loadAll());
  //   }
  // }, [allValid, dispatch]);

  return <>{children}</>;
}

export default StoreInitializer;

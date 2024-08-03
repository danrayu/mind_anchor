"use client";
import { loadAll, setDebug } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { useAllValid } from "@/app/util/stateValidationHooks";
import { useSession } from "next-auth/react";


import React, { useEffect } from "react";
interface StoreInitializerProps {
  children: React.ReactNode;
}

function StoreInitializer({ children }: StoreInitializerProps) {
  const dispatch = useAppDispatch();
  const allValid = useAllValid();
  const { status, data: session, update: updateSession } = useSession();

  useEffect(() => {
    const isDebugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
    dispatch(setDebug(isDebugMode))
    if (!allValid && !!session?.user) {
      dispatch(loadAll());
    }
  }, [allValid, dispatch, !!session]);

  return <>{children}</>;
}

export default StoreInitializer;

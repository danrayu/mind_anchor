"use client";
import { loadAll } from "@/app/store/actions";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useAllValid } from "@/app/util/stateValidationHooks";
import React, { useEffect } from "react";
interface StoreInitializerProps {
  children: React.ReactNode;
}

function StoreInitializer({ children }: StoreInitializerProps) {
  const dispatch = useAppDispatch();
  const allValid = useAllValid();

  useEffect(() => {
    if (!allValid) {
      console.log("loaded all");
      dispatch(loadAll());
    }
  }, [allValid, dispatch]);

  return <>{children}</>;
}

export default StoreInitializer;

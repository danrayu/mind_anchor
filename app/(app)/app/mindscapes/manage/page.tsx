"use client";
import {
  useMindscapesValid,
  useScheduleValid,
} from "@/app/util/stateValidationHooks";
import React from "react";
import SchedulePage from "../components/SchedulePage";

function Page() {
  const mindscapesValid = useMindscapesValid();
  const scheduleValid = useScheduleValid();

  return mindscapesValid && scheduleValid && <SchedulePage />;
}

export default Page;

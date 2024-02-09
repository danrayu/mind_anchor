"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MindscapeView from "./mindscapes/components/MindscapeView";
import { useAppSelector } from "@/app/store/hooks";

function AppPage() {
  const schedule = useAppSelector((state) => state.schedule.schedule);

  const [activeMindscape, setActiveMindscape] = useState<Mindscape>();
  const scheduleRef = useRef(schedule);

  useEffect(() => {
    scheduleRef.current = schedule;
    if (schedule) {
      setActiveMindscape(getActiveMindscape(scheduleRef.current));
    }
  }, [schedule]);

  const getActiveMindscape = (schedule: Schedule): Mindscape => {
    const currentTime = new Date();
    for (let i = 0; i < schedule.length; i++) {
      if (i === schedule.length - 1) {
        return schedule[i].mindscape;
      }
      const [hours0, minutes0] = schedule[i].time.split(":").map(Number);
      const [hours1, minutes1] = schedule[i + 1].time.split(":").map(Number);

      const date0 = currentTime;

      date0.setHours(hours0);
      date0.setMinutes(minutes0);
      const date1 = currentTime;

      date1.setHours(hours1);
      date1.setMinutes(minutes1);

      if (currentTime >= date0 && currentTime < date1) {
        return schedule[i].mindscape;
      }
    }
    return activeMindscape!;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMs = getActiveMindscape(schedule);
      if (activeMindscape) {
        if (currentMs.id !== activeMindscape.id) {
          console.log("reload to get the currently scheduled mindscape");
        }
      }
    }, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="mt-10">
      {activeMindscape && <MindscapeView mindscape={activeMindscape} />}
      {!activeMindscape && (
        <div className="flex items-center justify-center h-screen pb-[200px]">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
    </div>
  );
}

export default AppPage;

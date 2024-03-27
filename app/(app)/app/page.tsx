"use client";
import { useEffect, useRef, useState } from "react";
import MindscapeView from "./mindscapes/components/MindscapeView";
import { useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";

function AppPage() {
  const schedule = useAppSelector((state) => state.schedule.schedule);
  const router = useRouter();

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
        <div className="flex flex-nowrap flex-col space-y-4 max-w-[700px] m-auto">
            <span className="text-3xl font-bold ">
              No mindscapes added to schedule.
            </span>
            <span className="text-3xl font-bold "></span>
            <button
              className="btn btn-primary max-w-[200px]"
              onClick={() => {
                router.push("/app/mindscapes/manage");
              }}
            >
              Schedule Mindscape
            </button>
        </div>
      )}
    </div>
  );
}

export default AppPage;

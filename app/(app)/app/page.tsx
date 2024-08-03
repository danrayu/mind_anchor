"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MindscapeView from "./mindscapes/components/MindscapeView";
import { useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { DateTime } from "next-auth/providers/kakao";

function AppPage() {
  const schedule = useAppSelector((state) => state.schedule.schedule);
  const router = useRouter();
  const doDebug = useAppSelector((state) => state.debug.doDebug)

  const [activeMindscape, setActiveMindscape] = useState<Mindscape>();
  const scheduleRef = useRef(schedule);

  const getActiveMindscape = useCallback(
    (
      schedule: Schedule
    ): Mindscape | undefined => {
      const currentTime = new Date()
      for (let i = 0; i < schedule.length; i++) {
        if (i === schedule.length - 1) {
          return schedule[i].mindscape;
        }
        const [hours0, minutes0] = schedule[i].time.split(":").map(Number);
        const [hours1, minutes1] = schedule[i + 1].time.split(":").map(Number);
  
        const date0 = new Date();
  
        date0.setHours(hours0);
        date0.setMinutes(minutes0);
        const date1 = new Date();
  
        date1.setHours(hours1);
        date1.setMinutes(minutes1);
  
        if (currentTime >= date0 && currentTime < date1) {
          return schedule[i].mindscape;
        }
      }
      return undefined;
    }, []
  )

  useEffect(() => {
    if (doDebug) console.log("Located active schedule: ", schedule )
    scheduleRef.current = schedule;
    if (schedule) {
      const activeMindscape = getActiveMindscape(scheduleRef.current);
      if (doDebug) console.log("Located active mindscape: ", activeMindscape )
      setActiveMindscape(activeMindscape);
    }
  }, [schedule, doDebug, getActiveMindscape]);

  useEffect(() => {
    const checkAndUpdateMindscape = () => {
      const currentMs = getActiveMindscape(schedule);
      if (currentMs && (!activeMindscape || currentMs.id !== activeMindscape.id)) {
        const result = window.confirm(`It is time for scheduled mindscape ${currentMs.title}. Do you wish to load it?`);
        if (doDebug) console.log("Result from confirmation:", result);

        if (result) {
          setActiveMindscape(currentMs);
          if (doDebug) console.log("Set new active mindscape:", currentMs.title);
        }
      }
    };

    const interval = setInterval(checkAndUpdateMindscape, 30 * 1000);
    return () => clearInterval(interval);
  }, [schedule, getActiveMindscape, doDebug, activeMindscape]);

  useEffect(() => {
    console.log("Use effect logged the change in active mindscape")
  }, [activeMindscape])

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

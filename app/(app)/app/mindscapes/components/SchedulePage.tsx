import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import MindscapeScheduler from "./MindscapeScheduler";
import { fetchUpdateSchedule } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
import Link from "next/link";

function SchedulePage() {
  const dispatch = useAppDispatch();
  const initSchedule: Schedule = useAppSelector(
    (state) => state.schedule.schedule
  );

  const [schedule, setSchedule] = useState(initSchedule);
  const [activeMindscape, setActiveMindscape] = useState<number | undefined>(0);
  const scheduleRef = useRef(initSchedule);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMindscape(getIsMindscapeActive(new Date(), scheduleRef.current));
    }, 20 * 1000); // every 20 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setActiveMindscape(getIsMindscapeActive(new Date(), scheduleRef.current));
  }, [schedule]);

  const saveSchedule = (schedule: Schedule) => {
    scheduleRef.current = schedule;
    const fetchUpdate = async () => {
      const data = schedule.map((row) => {
        return {
          id: row.mindscape.id,
          time: row.time,
        };
      });
      const response = await fetchUpdateSchedule({ config: data });
      if (response.ok) {
        dispatch({ type: "SET_SCHEDULE", payload: schedule });
      }
      dispatch(appFetch(Types.Schedule));
    };

    fetchUpdate();
  };

  const getIsMindscapeActive = (
    currentTime: Date,
    schedule: Schedule
  ): number | undefined => {
    for (let i = 0; i < schedule.length; i++) {
      if (i === schedule.length - 1) {
        return schedule[i].mindscape.id;
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
        return schedule[i].mindscape.id;
      }
    }
    return undefined;
  };

  const addToSortedSchedule = (value: { time: any; mindscape: Mindscape }) => {
    setSchedule((oldState) => {
      oldState = [...oldState, value];

      const newState = oldState.sort((a, b) => {
        const [hours0, minutes0] = a.time.split(":").map(Number);
        const [hours1, minutes1] = b.time.split(":").map(Number);
        const date0 = new Date();

        date0.setHours(hours0);
        date0.setMinutes(minutes0);

        const date1 = new Date();
        date1.setHours(hours1);
        date1.setMinutes(minutes1);

        return date0.getTime() - date1.getTime();
      });
      saveSchedule(newState);
      return newState;
    });
  };

  const removeScheduledMs = (targetRow: any) => {
    const index = schedule.findIndex((row) => row === targetRow);
    const newState = schedule.filter((_, i) => index !== i);
    setSchedule(newState);
    saveSchedule(newState);
  };

  return (
    <>
      <Modal
        id="mindscape-scheduler"
        title="Schedule Mindscape"
        className="max-w-xs"
      >
        <MindscapeScheduler handleSave={addToSortedSchedule} />
      </Modal>
      <div className="mt-10">
        <h1 className="text-[35px] font-bold">Schedule</h1>
        <div id="schedule">
          <div className=" mt-4">
            <table className="table text-base">
              <colgroup>
                <col className="w-2/12" />
                <col className="w-7/12" />
                <col className="w-2/12" />
                <col className="w-1/12" />
              </colgroup>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Mindscape</th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((row, index) => {
                  const isActive = row.mindscape.id === activeMindscape;
                  return (
                    <tr
                      key={`id${row.mindscape.id}_${row.time}`}
                      className={isActive ? "bg-base-200 rounded-xl" : ""}
                    >
                      <td>{row.time}</td>
                      <td className="underline">
                        <Link href={"/app/mindscapes/" + row.mindscape.id}>
                          {row.mindscape.title}
                        </Link>
                      </td>
                      <td className="text-primary">{isActive && "Active"}</td>
                      <td className="flex justify-end">
                        <button
                          className="btn btn-circle btn-ghost ml-auto mr-2"
                          onClick={() => {
                            removeScheduledMs(row);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <button
                className="btn btn-outline"
                onClick={() =>
                  (
                    document.getElementById("mindscape-scheduler")! as any
                  ).showModal()
                }
              >
                Add Mindscape
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulePage;

import { useAppSelector } from "@/app/store/hooks";
import React, { useEffect, useState } from "react";
import TimePicker from "./TimePicker";
interface MindscapeSchedulerProps {
  handleSave: (value: {time: any, mindscape: Mindscape}) => void
}

function MindscapeScheduler({handleSave: onSave}: MindscapeSchedulerProps) {
  const mindscapes = useAppSelector((state) => state.mindscapes.mindscapes);
  const [selectedMindscape, setSelectedMindscape] = useState<undefined | Mindscape>(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const [valid, setInputValidity] = useState(false);

  const handleSelectTime = (event: any) => {
    const time = event.target.value;
    setSelectedTime(time);
  };

  const handleSelectMs = (e: any) => {
    setSelectedMindscape(
      mindscapes.find((ms: Mindscape) => ms.id === parseInt(e.target.value))
    );
  };

  useEffect(() => {
    handleInputChange();
  }, [selectedMindscape, selectedTime]);

  const handleSave = () => {
    onSave({
      time: selectedTime,
      mindscape: selectedMindscape!
    })
  };

  const handleInputChange = () => {
    if (selectedMindscape && selectedTime) {
      setInputValidity(true);
    } else {
      setInputValidity(false);
    }
  };
  return (
    <div className="max-w-xs">
      <div className="form-control w-full max-w-xs">
        <label htmlFor="mindscapeInput" className="label">
          <span className="label-text">Mindscape</span>
        </label>
        <select
          name="mindscapeInput"
          className="select select-bordered w-full max-w-xs"
          onChange={handleSelectMs}
          defaultValue={123}
        >
          <option disabled value={123}>
            Select mindscape
          </option>
          {mindscapes.map((ms: Mindscape) => (
            <option key={ms.id} value={ms.id}>
              {ms.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="timeInput" className="label">
          <span className="label-text">Select or Type a Time</span>
        </label>
        <input
          type="time"
          id="timeInput"
          name="timeInput"
          className="input input-bordered w-full max-w-xs"
          placeholder="Type or select a time"
          onChange={handleSelectTime}
        />
      </div>
      <TimePicker />
      <div className="flex justify-end mt-5 -mb-3">
        <form method="dialog">
          <button
            className={"btn btn-primary " + (!valid && "btn-disabled")}
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default MindscapeScheduler;

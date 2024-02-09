import React from "react";

function TimeSelector() {
  return (
    
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
      />
    </div>
  );
}

export default TimeSelector;

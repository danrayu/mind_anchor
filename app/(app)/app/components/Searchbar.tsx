import React from "react";

function Searchbar() {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className={"input input-bordered border-slate-400 ml-0 mt-2 mb-2 w-full max-w-[600px]"}
      />
    </div>
  );
}

export default Searchbar;

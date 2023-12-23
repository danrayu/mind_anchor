import React from "react";

function SearchSidebar() {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className={"input input-bordered ml-0 mt-2 mb-2 w-full max-w-[600px]"}
      />
    </div>
  );
}

export default SearchSidebar;

import React from "react";
interface SearchbarProps {
  onChange?: (valueAfterChange: string) => void
  
}
function Searchbar({onChange}: SearchbarProps) {
  const changed = (event: any) => {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className={"input input-bordered border-slate-300 ml-0 mt-2 mb-2 w-full max-w-[600px]"}
        onChange={changed}
      />
    </div>
  );
}

export default Searchbar;

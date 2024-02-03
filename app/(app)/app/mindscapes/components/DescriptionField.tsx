import React from "react";
interface DescriptionFieldProps {
  value: string;
  onChange: (event: any) => void;
}

function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor="description" className="block font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        spellCheck="false"
        className="mt-1 py-2 block textarea textarea-bordered p-4 h-40 w-[500px]"
      ></textarea>
    </div>

  );
}

export default DescriptionField;

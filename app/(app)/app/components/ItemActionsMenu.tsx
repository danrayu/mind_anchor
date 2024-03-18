import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

export type Position = {
  top: number;
  left: number;
};

interface ItemActionsMenuProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: Position;
}

function ItemActionsMenu({ onClose, onEdit, onDelete, position }: ItemActionsMenuProps) {
  const close = () => {
    onClose();
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const item: any = ref.current;
      if (item && !item.contains(event.target)) {
        onClose();
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul
      className="menu bg-base-200 w-56 rounded-box"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        // additional styling
      }}
      ref={ref}
    >
      <li className="flex items-center flex-row">
        <a onClick={onEdit}>
          <FaPencil />
          Edit
        </a>
      </li>
      <li className="flex items-center flex-row">
        <a onClick={onDelete}>
          <FaTrashCan />
          Delete
        </a>
      </li>
      <li className="flex items-center flex-row">
        <a onClick={close}>
          <FaTimes />
          Close
        </a>
      </li>
    </ul>
  );
}

export default ItemActionsMenu;

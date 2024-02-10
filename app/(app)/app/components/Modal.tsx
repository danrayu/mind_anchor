import React from "react";
interface ModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id: string;
}
function Modal({ title, description, children, className, id }: ModalProps) {
  return (
    <dialog id={id} className={"modal "}>
      <div className={"modal-box top-[100px] " + (className)}>
        <h3 className="font-bold text-lg">{title}</h3>
        {description && <p className="py-4">{description}</p>}
        <div>{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;

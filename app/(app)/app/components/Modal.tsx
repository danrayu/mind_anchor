import React from 'react'
interface ModalProps {
  title: string,
  children: React.ReactNode
  id: string
}
function Modal({title, children, id}: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">Add memes of your choosing.</p>
        <div>
          {children}
          
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default Modal
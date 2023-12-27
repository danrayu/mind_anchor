import { useRouter } from "next/navigation";
import { useState } from "react";

interface MemeProps {
  meme: Meme;
}

function MemeContainer({ meme }: MemeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Toggle the open state
  const toggleOpen = () => setIsOpen(!isOpen);

  function editMeme(event: any) {
    event.stopPropagation();
    router.push('/app/memes/'+meme.id+'/edit');
  }

  return (
    <div className="outline mb-4 rounded-xl">
      <div className="flex p-4 justify-between items-center hover:bg-slate-100" onClick={toggleOpen}>
        <div className="space-x-3 ">
          <span className={!isOpen ? "ml-[3px]" : ''}>{isOpen ? "▼" : ">"}</span>
          <span>{meme.title}</span>
        </div>
        <button className="btn btn-outline " onClick={editMeme}>Edit</button>
      </div>
      <div
        className={` overflow-hidden ${
          isOpen ? "max-h-96 p-4 pt-0" : "max-h-0"
        }`}
      >
        <div className="mt-3"></div>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default MemeContainer;

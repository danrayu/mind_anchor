import { useRouter } from "next/navigation";
import React from "react";
interface CollectionItemProps {
  collection: Collection;
}
function CollectionItem({ collection }: CollectionItemProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/app/collections/" + collection.id);
  };
  return (
    <div className="collapse outline mt-4">
      <input type="checkbox" />

      <div className="collapse-title flex flex-wrap justify-between">
        <div className="text-[23px] font-medium">
          {collection.title}
        </div>
        <button className="btn btn-outline z-10" onClick={handleEdit}>
          Edit
        </button>
      </div>
      <div className="collapse-content">
        {collection.memes.map((meme: CollectionMeme) => {
          return <div key={meme.id}>{meme.meme.title}</div>;
        })}
        <p>hello</p>
      </div>
    </div>
  );
}

export default CollectionItem;

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
interface CategoryContainerProps {
  category: Category;
}
function CategoryContainer({ category }: CategoryContainerProps) {
  const router = useRouter();
  const params = useSearchParams();

  const viewMemes = () => {
    const paramsNew = new URLSearchParams(params);
    paramsNew.set("cats", `${category.id}:${1}`);
    router.push("/app/memes?" + paramsNew.toString());
  };
  const deleteCat = () => {

  }
  return (
    <div className="outline mb-4 outline-slate-350 rounded-xl">
      <div className="flex p-4 justify-between items-center">
        <span className="font-semibold text-[17px] ml-4">{category.name}</span>
        <div className="space-x-8">
          <button className="btn btn-link text-error-content font-normal text-sm p-0" onClick={deleteCat}>
            Delete
          </button>
          <button className="btn btn-primary " onClick={viewMemes}>
            View Memes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryContainer;

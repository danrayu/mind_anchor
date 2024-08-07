import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Brand() {
  const router = useRouter();

  return (
    <div className="mb-2 ml-4 cursor-pointer" onClick={() => {
      router.push('/');
    }}>
      <div className="flex">
        <Image src="/logo.png" width={30} height={30} className="rounded-xl" alt="MindAnchor logo" />
        <h2 className="text-xl font-bold mt-1 ml-2">
          MindAnchor
        </h2>
      </div>
    </div>
  );
}

export default Brand;

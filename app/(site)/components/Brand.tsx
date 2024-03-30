"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Brand() {
  const router = useRouter();

  return (
    <div className="mb-2 ml-4 cursor-pointer" onClick={() => {
      router.push('/');
    }}>
      <div className="flex items-center">
        <Image src="/logo.png" width={34} height={34} className="rounded-xl w-[34px] h-[34px]" alt="MindAnchor logo" />
        <h2 className="text-white font-bold text-2xl mt-1 ml-2">
          MindAnchor
        </h2>
      </div>
    </div>
  );
}

export default Brand;

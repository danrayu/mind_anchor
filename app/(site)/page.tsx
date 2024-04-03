import React from "react";
import PageTitle from "./components/PageTitle";
import Subtitle from "./components/Subtitle";
import GoToAppButton from "./components/GoToAppButton";
import Navbar from "./components/Navbar";
import Image from "next/image";
import SegmentTitle from "./components/SegmentTitle";

function SiteMainPage() {
  return (
    <div>
      <div className="starry-sky-bg w-full">
        <Navbar />
        <div className="mx-auto max-w-[1200px]  pt-[30px]">
          <div className="mt-8">
            <PageTitle />
          </div>
          <Image
            src={"/starry-sky-anchor.webp"}
            alt={"Starry sky with anchor background"}
            width={1792}
            height={1024}
            className="h-[500px] w-auto mt-2 mb-2 mx-auto "
          />
          <div className="">
            <Subtitle />
          </div>
          <div className="flex items-center justify-center mt-8">
            <GoToAppButton />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#010101] to-base-transparent h-[100px]">
        <span></span>
      </div>
      <div className="mt-[50px]">
        <Image
          src={"/mindscape-morning.png"}
          alt={"Application showing mindscape page example"}
          width={1413}
          height={867}
          className="h-[560px] w-auto cursor-default mt-2 mb-2 mx-auto "
        />
        <div>
        </div>
      </div>
    </div>
  );
}

export default SiteMainPage;

import React from "react";
import PageTitle from "./components/PageTitle";
import Subtitle from "./components/Subtitle";
import GoToAppButton from "./components/GoToAppButton";
import Navbar from "./components/Navbar";
import Image from "next/image";
import SegmentSubtitle from "./components/SegmentSubtitle";
import Segments from "./components/Segments";
import SegmentTitle from "./components/SegmentTitle";
import SegmentImage from "./components/SegmentImage";

function SiteMainPage() {
  return (
    <div className="mb-16">
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
      <div className="bg-gradient-to-b from-[#010101] to-[#010101] h-[100px]">
        <span></span>
      </div>
      <div className="mt-16">
        <Segments>
          <SegmentTitle text="A Web App for recording your Ideas" />
        </Segments>
        <Segments>
          <SegmentSubtitle text="Write down your values and thoughts" />
          <SegmentImage image={{
            src:"/add-meme.png",
            alt:'Image of the "add new meme" page',
            width:1440,
            height:1000
          }}/>
        </Segments>
        <Segments>
          <SegmentSubtitle text="Categorize them in your own way" />
          <SegmentImage image={{
            src:"/categories.png",
            alt:'Image of the categories page',
            width:1440,
            height:1150
          }}/>
        </Segments>
        <Segments>
          <SegmentSubtitle text="Add them to Mindscapes" />
          <SegmentImage image={{
            src:"/mindscape-morning.png",
            alt:'an example of a mindscape',
            width:1413,
            height:867
          }}/>
        </Segments>
      </div>
    </div>
  );
}

export default SiteMainPage;

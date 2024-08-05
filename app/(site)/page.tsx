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
    <div className="">
      <div className="starry-sky-bg px-4 w-full">
        <Navbar />
        <div className="mx-auto max-w-[1200px]  pt-[30px]">
          <PageTitle />
          <Image
            src={"/starry-sky-anchor.webp"}
            alt={"Starry sky with anchor background"}
            width={1792}
            height={1024}
            className="max-h-[400px] h-full w-auto mt-2 mb-2 mx-auto "
          />
          <div className="">
            <Subtitle>Record your thoughts.</Subtitle>
            <Subtitle>Organize your mind.</Subtitle>
          </div>
          <div className="flex items-center justify-center mt-8">
            <GoToAppButton />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#010101] to-[#010101] h-[100px]">
        <span></span>
      </div>
      <div className="mt-16 mx-4">
        <Segments>
          <SegmentTitle text="A Web App for recording your Ideas" />
        </Segments>
        <Segments>
          <SegmentSubtitle text="Write down your values and thoughts" />
          <SegmentImage image={{
            src:"/add-meme.webp",
            alt:'Image of the "add new meme" page',
            width:1490,
            height:1396
          }}/>
        </Segments>
        <Segments>
          <SegmentSubtitle text="Categorize them in your own way" />
          <SegmentImage image={{
            src:"/categories.webp",
            alt:'Image of the categories page',
            width:1490,
            height:1289
          }}/>
        </Segments>
        <Segments>
          <SegmentSubtitle text="Add them to Mindscapes" />
          <SegmentImage image={{
            src:"/mindscape-morning.webp",
            alt:'an example of a mindscape',
            width:1490,
            height:1050
          }}/>
        </Segments>
      </div>
    </div>
  );
}

export default SiteMainPage;

import React from "react";
import PageTitle from "./components/PageTitle";
import Subtitle from "./components/Subtitle";
import GoToAppButton from "./components/GoToAppButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";

function SiteMainPage() {
  return (
    <div className="starry-sky-bg w-full">
      <Navbar />
      <div className="mx-auto max-w-[1200px] pb-[50px] pt-[30px]">
        <div className="mt-8">
          <PageTitle />
        </div>
        <Image src={"/starry-sky-anchor.webp"} alt={"Starry sky with anchor background"} width={1792} height={1024} className="h-[500px] w-auto mt-2 mb-2 mx-auto "/>
        <div className="">
          <Subtitle />
        </div>
        <div className="flex items-center justify-center mt-8">
          <GoToAppButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SiteMainPage;

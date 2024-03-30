import React from "react";
import PageTitle from "./components/PageTitle";
import Subtitle from "./components/Subtitle";
import GoToAppButton from "./components/GoToAppButton";

function SiteMainPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1200px]">
        <div className="mt-8">
          <PageTitle />
        </div>
        <div className="mt-[70px]">
          <Subtitle />
        </div>
        <div className="flex items-center justify-center mt-[50px]">
          <GoToAppButton />
        </div>
      </div>
    </div>
  );
}

export default SiteMainPage;

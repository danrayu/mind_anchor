import React from "react";

function MainView({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full">
      <div className="mx-auto max-w-[900px]">
        <div className="mx-8">{children}</div>
      </div>
    </main>
  );
}

export default MainView;

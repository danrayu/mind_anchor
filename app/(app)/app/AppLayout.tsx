import React from "react";
import Sidebar from "./components/Sidebar";
import MainView from "./components/Main";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindAnchor",
  description: "MindAnchor: Secure and revisit your core beliefs",
};

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div>
          <Sidebar />
          <MainView>{children}</MainView>
        </div>
      </body>
    </html>
  );
}

export default AppLayout;

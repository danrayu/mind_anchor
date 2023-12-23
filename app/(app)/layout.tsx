import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "./app/components/Sidebar";
import MainView from "./app/components/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindAnchor",
  description: "MindAnchor: Secure and revisit your core beliefs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div>
          <div className="drawer lg:drawer-open">
            <input id="app-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
              <MainView>{children}</MainView>
              <label
                htmlFor="app-drawer"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <Sidebar/>
          </div>
        </div>
      </body>
    </html>
  );
}

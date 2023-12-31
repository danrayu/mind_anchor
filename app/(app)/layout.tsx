import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "./app/components/Sidebar";
import MainView from "./app/components/Main";
import StateProvider from "./app/components/StateProvider";
import StoreInitializer from "./app/components/StoreInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindAnchor",
  description: "MindAnchor: Secure and revisit your core beliefs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [memesResponse, categoriesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/memes/?wCats`),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`),
  ]);
  var memes = await memesResponse.json();
  var cats = await categoriesResponse.json();

  return (
    <StateProvider>
      <StoreInitializer memes={memes} categories={cats}>
        <html lang="en" data-theme="light">
          <body className={inter.className}>
            <div>
              <div className="drawer lg:drawer-open">
                <input
                  id="app-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center">
                  <MainView>{children}</MainView>
                  <label
                    htmlFor="app-drawer"
                    className="btn btn-primary drawer-button lg:hidden"
                  >
                    Open drawer
                  </label>
                </div>
                <Sidebar />
              </div>
            </div>
          </body>
        </html>
      </StoreInitializer>
    </StateProvider>
  );
}

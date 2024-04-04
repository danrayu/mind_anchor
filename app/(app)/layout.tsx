import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "./app/components/sidebar/Sidebar";
import MainView from "./app/components/Main";
import StateProvider from "./app/components/StateProvider";
import StoreInitializer from "./app/components/StoreInitializer";
import AuthProvider from "./app/components/AuthProvider";
import Header from "./app/components/Header";

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
    <StateProvider>
      <AuthProvider>
        <StoreInitializer>
          <html lang="en" data-theme="dark">
            <body className={inter.className}>
              <div>
                <div className="drawer lg:drawer-open">
                  <input
                    id="app-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />

                  <div className="drawer-content flex flex-col">
                    <Header />
                    <div className="h-6">{" "}</div>
                    <MainView>{children}</MainView>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </body>
          </html>
        </StoreInitializer>
      </AuthProvider>
    </StateProvider>
  );
}

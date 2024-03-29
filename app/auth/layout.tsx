import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MainView from "../(app)/app/components/Main";
import StateProvider from "../(app)/app/components/StateProvider";
import StoreInitializer from "../(app)/app/components/StoreInitializer";
import AuthProvider from "../(app)/app/components/AuthProvider";
import Sidebar from "../(app)/app/components/sidebar/Sidebar";

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
      <AuthProvider>
          <html lang="en" data-theme="dark">
            <body className={inter.className}>
              <div>
              {children}
              </div>
            </body>
          </html>
      </AuthProvider>
  );
}

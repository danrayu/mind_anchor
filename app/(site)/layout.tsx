import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "../(app)/app/components/AuthProvider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindAnchor",
  description: "MindAnchor: Never lose sight of your mental compass",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div>
          {children}
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}

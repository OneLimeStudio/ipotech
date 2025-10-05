import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";   // 👈 Import here
import IPOList from "@/components/IPOList";
export const metadata: Metadata = {
  title: "IPO_TECH",
  description: "Built with Next.js + TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900" style={{ background: "rgb(21,39,51)" }}>
        <Navbar />   {/* 👈 Now Navbar appears everywhere */}
        <main className="p-6">{children}</main>
      

        <div className="min-h-screen bg-gray-100"  >
          <IPOList />
        </div>

        <footer className="p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} IPO_TECH
        </footer>

      </body>
    </html>
  );
}

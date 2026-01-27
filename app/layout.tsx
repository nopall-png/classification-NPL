import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI News Analyzer",
  description: "News & Voice Classification System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[#161616] text-[#F3F3F5] font-sans">
        {/* Main App Container */}
        <div className="min-h-screen w-full flex justify-center">
          <main className="w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

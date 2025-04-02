import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Define font variables for use in the layout
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budimex Document Extractor",
  description: "Budimex Document Extractor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col h-screen font-sans">
        <header className="bg-yellow-100">
          <div className="max-w-[1400px] mx-auto text-center p-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Budimex Document Extractor
            </h1>
          </div>
        </header>
        <main className="grow items-center content-center p-4 max-w-[1400px] mx-auto">
          {children}
        </main>
        <footer className="bg-yellow-100">
          <div className="max-w-[1400px] mx-auto text-center p-8">
            <p className="text-xl font-bold text-gray-800 tracking-tight">
              Powered by{" "}
              <a href="https://agentsify.ai/" target="_blank">
                agentsify.ai
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

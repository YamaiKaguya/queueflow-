import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google"; // Import Nunito
import "@/src/style/globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

const nunito = Nunito({ // Initialize Nunito
   subsets: ["latin"],
   weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
   title: "QueueFlow+",
   description: "A queue management system built with Next.js and TypeScript.",
   icons: {
      icon: "/QueueFlow+.png",
      shortcut: "/favicon.ico",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={nunito.className}>
      <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         {children}
      </body>
      </html>
   );
}
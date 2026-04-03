// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/src/assets/style/globals.css";
// import { Header } from "@/src/components/header/header"

const nunito = Nunito({
   subsets: ["latin"],
   weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
   metadataBase: new URL('http://localhost:3000'), 
   title: "QueueFlow+",
   description: "A queue management system built with Next.js and TypeScript.",
   icons: {
      icon: "/QueueFlow+.png",
      shortcut: "/favicon.ico",
   },
openGraph: {
      title: "QueueFlow+",
      description: "A queue management system built with Next.js and TypeScript.",
      images: ["/QueueFlow+.png"],
   },
};


export default function RootLayout({ 
   children 
}: { 
   children: React.ReactNode 
}) {
   return (
      <html lang="en">
         <body className={`${nunito.className} h-full antialiased`}>
            {children}
         </body>
      </html>
   );
}
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/src/assets/style/globals.css";

const nunito = Nunito({
   subsets: ["latin"],
   weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
   metadataBase: new URL('http://localhost:3000'),

   title: "QueueFlow+",
   description: "A web based queue management system.",

   applicationName: "QueueFlow+",

   keywords: [
      "Queue Management",
      "Hospital Queue",
      "QueueFlow+",
   ],

   icons: {
      icon: [
         { url: "/QueueFlow+.png", type: "image/png" },
      ],
   },

   openGraph: {
      title: "QueueFlow+",
      description: "A web based queue management system",
      url: "http://localhost:3000",
      siteName: "QueueFlow+",
      images: [
         {
            url: "/QueueFlow+.png",
            width: 1200,
            height: 630,
         },
      ],
      locale: "en_US",
      type: "website",
   },

   robots: {
      index: true,
      follow: true,
   },
};

export default function RootLayout({ 
   children 
}: { 
   children: React.ReactNode 
}) {
   return (
      <html lang="en">
         <body className={`${nunito.className} min-h-screen antialiased flex flex-col`}>
            {children}
         </body>
      </html>
   );
}
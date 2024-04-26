import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";


import "./globals.css";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import {Provider} from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arees Form",
  description: "Modify Database Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <Provider>
            {children}
          </Provider>
        <Toaster />
      </body>
    </html>
  );
}

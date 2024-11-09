import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { Inter } from 'next/font/google';


import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/footer/footer";

import { Toaster } from "@/components/ui/toaster";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import DynamicTitle from "@/components/dynamic-title";
import Header from "@/components/header/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `https://${process.env.NEXT_PUBLIC_BASE_URL}`;

export const inter = Inter({ subsets: ['latin'] });


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tiles Italia",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
        </nav>
        <Header />
        <main>
          <DynamicBreadcrumb />
          <DynamicTitle pageTitle={metadata.title as string} />
          {children}
        </main >
        <Footer />
        <Toaster />
      </body >
    </html >
  );
}
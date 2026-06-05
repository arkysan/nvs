import type { Metadata } from "next";
import { EditorRoot } from "@/components/editor/EditorRoot";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Vision OS - China Vehicle Export Platform",
  description: "Static-first New Vision export platform for verified vehicles, Year 1 markets, quote requests, dealers, and supplier verification.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.defaultLanguage}>
      <body>
        <div className="shell">
          <Header />
          <main>{children}</main>
          <Footer />
          <EditorRoot />
        </div>
      </body>
    </html>
  );
}

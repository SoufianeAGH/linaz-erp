import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Linaz ERP",
  description: "Prototype cliquable de l'ERP Linaz Living",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <Nav />
        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}

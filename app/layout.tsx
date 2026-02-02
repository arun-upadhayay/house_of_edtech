import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of EdTech - Tasks",
  description: "Secure CRUD with Next.js 16 + PostgreSQL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        {children}
      </body>
    </html>
  );
}

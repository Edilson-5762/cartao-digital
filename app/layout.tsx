import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Stack Analytics | Edilson Moraes",
  description:
    "Portfólio de Edilson Moraes — Full Stack Developer e Data Analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans bg-graphite-950 text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

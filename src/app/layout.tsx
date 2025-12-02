import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campers Rental",
  description: "Find your dream camper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
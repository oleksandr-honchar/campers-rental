import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campers Rental - Find Your Dream Camper",
  description:
    "Find and rent the perfect camper for your next adventure. Browse our extensive catalog of campervans and motorhomes.",
  keywords:
    "camper rental, motorhome, campervan, RV rental, travel, adventure",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Campers Rental - Find Your Dream Camper",
    description:
      "Find and rent the perfect camper for your next adventure. Browse our extensive catalog of campervans and motorhomes.",
    url: "http://localhost:3000",
    siteName: "Campers Rental",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Campers Rental",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campers Rental - Find Your Dream Camper",
    description:
      "Find and rent the perfect camper for your next adventure.",
    images: ["/og-image.jpg"],
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />

          <main style={{ flex: 1 }}>
            <ClientWrapper>{children}</ClientWrapper>
          </main>

          {/* GLOBAL TOAST CONTAINER */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 99999, position: "fixed" }}
          />
        </div>
      </body>
    </html>
  );
}

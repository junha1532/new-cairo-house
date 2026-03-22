import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "New Cairo House | Premium Egypt Travel Concierge",
    template: "%s | New Cairo House"
  },
  description:
    "Boutique Egypt travel concierge for higher-budget travelers. Custom 7‑day itineraries, trusted guides, and a curated Cairo stay.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "New Cairo House | Premium Egypt Travel Concierge",
    description:
      "Custom 7‑day Egypt itineraries and a curated Cairo stay. High-touch planning for travelers who value comfort and authenticity.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh bg-white">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


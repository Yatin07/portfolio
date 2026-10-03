import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yatin Patil | Developer Portfolio",
  description: "B.Tech IT Student | Data Science & AI Enthusiast",
  openGraph: {
    title: "Yatin Patil | Portfolio",
    description: "Building intelligent systems with Data Science, AI and scalable software solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

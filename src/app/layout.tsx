import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('keydown', function(e) {
              if (e.key.toLowerCase() === 't') {
                var newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
              }
            });
          `
        }} />
        {children}
      </body>
    </html>
  );
}

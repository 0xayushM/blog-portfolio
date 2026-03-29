import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seekho Sales – India's First Free Sales Training Platform",
  description: "Free Sales Training by Abhishek Upadhyay. 15+ years of FMCG, Pharma & Corporate Sales experience. Real Sales | Real Experience | Real Growth.",
  keywords: ["sales training", "free sales course", "FMCG sales", "pharma sales", "corporate sales", "Abhishek Upadhyay", "sales skills", "India"],
  authors: [{ name: "Abhishek Upadhyay" }],
  creator: "Abhishek Upadhyay",
  publisher: "Seekho Sales",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Seekho Sales – India's First Free Sales Training Platform",
    description: "Free Sales Training by Abhishek Upadhyay. 15+ years of FMCG, Pharma & Corporate Sales experience. Real Sales | Real Experience | Real Growth.",
    url: "https://seekhosales.com",
    siteName: "Seekho Sales",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seekho Sales – India's First Free Sales Training Platform",
    description: "Free Sales Training by Abhishek Upadhyay. 15+ years of FMCG, Pharma & Corporate Sales experience.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6168676800708725"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "İyiliğin Bir Parçası Ol | JCI & LÖSEV",
  description: "JCI ve LÖSEV işbirliğiyle sosyal sorumluluk projesi. Fotoğrafınızı yükleyin, maskotumuzla birlikte yeni bir görsel oluşturun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cream text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EngineeringProvider } from "@/context/EngineeringContext";
import Header from "@/components/layout/Header"; // NEW IMPORT

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alejandro Quesada | Full Stack & Web3 Portfolio",
  description: "Senior Full Stack Engineer & Blockchain Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var searchParams = new URLSearchParams(window.location.search);
                  var mode = searchParams.get('mode');
                  if (mode === 'web3' || mode === 'disruptor') {
                    document.body.dataset.theme = 'disruptor';
                    document.body.style.backgroundColor = '#020617';
                    document.body.style.color = '#e2e8f0';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Suspense fallback={null}>
          <EngineeringProvider>
            <Header /> {/* Replaced direct GlobalToggle with Header */}
            <main className="min-h-screen relative overflow-hidden">
              {children}
            </main>
          </EngineeringProvider>
        </Suspense>
      </body>
    </html>
  );
}

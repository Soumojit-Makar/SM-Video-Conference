import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SM Video Conference",
  description: "Video Conference",
  icons:{
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl:'/icons/logo.svg',
          socialButtonsVariant:'iconButton'
        },
        variables:{
          colorText:'#fff',
          colorPrimary:'#0E78F9',
          colorBackground:'#1c1f2e',
          colorInputBackground:'#252a41',
          colorInputText:'#fff',
        }
      }}
      >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
        <Toaster
        theme="dark"
        closeButton
        position="top-center"
        />
      </body>
      </ClerkProvider>
    </html>

  );
}

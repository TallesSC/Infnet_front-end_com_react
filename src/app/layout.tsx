import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: "TERMO",
  description: "",
};

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-openSans'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

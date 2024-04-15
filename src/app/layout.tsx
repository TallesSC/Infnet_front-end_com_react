import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.scss';
import { ReactNode } from 'react';

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
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}

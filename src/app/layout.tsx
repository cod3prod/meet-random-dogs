import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Random Meet Dogs",
  description: "Click a door to meet a random dog.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

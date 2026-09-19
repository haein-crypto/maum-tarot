import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마음 예보",
  description: "오늘의 흐름을 천천히 들여다보는 타로 리딩",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

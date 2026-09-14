import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paraluman | Brand Strategy & Communications Consulting Firm",
  description:
    "Paraluman đồng hành cùng doanh nghiệp kết nối chiến lược thương hiệu với mô hình kinh doanh, vận hành và tăng trưởng.",
  icons: {
    icon: [
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

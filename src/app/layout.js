import "./globals.css";
import { Providers } from "../lib/Providers";

export const metadata = {
  title: "NEO // CORE - Full-Stack Developer Portfolio",
  description: "Cyber-themed professional portfolio showcasing interactive futuristic user interfaces, high-performance decentralized web systems, and creative design integrations.",
  keywords: ["full stack developer", "cyberpunk portfolio", "web developer", "react nextjs developer", "sanity cms portfolio"],
  authors: [{ name: "Neo Hyperion" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

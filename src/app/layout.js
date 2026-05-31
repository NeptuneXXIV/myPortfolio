import "./globals.css";

export const metadata = {
  title: "NEO // CORE - Full-Stack Developer Portfolio",
  description: "Cyber-themed professional portfolio showcasing interactive futuristic user interfaces, high-performance decentralized web systems, and creative design integrations.",
  keywords: ["full stack developer", "cyberpunk portfolio", "web developer", "react nextjs developer", "sanity cms portfolio"],
  authors: [{ name: "Neo Hyperion" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

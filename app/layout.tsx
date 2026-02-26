import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEVIN // FAA — AI-Powered Modernization",
  description:
    "Cognition AI's DevinClaw platform for FAA application and database modernization. 200+ applications, 3,000 databases, one framework.",
  keywords: [
    "FAA",
    "modernization",
    "Cognition AI",
    "Devin",
    "federal",
    "government",
    "AI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

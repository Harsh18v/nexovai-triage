import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexovAI · Triage Room",
  description: "Ambient ED voice agent dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

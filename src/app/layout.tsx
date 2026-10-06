import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vijay Shankaran Vivekanand | Embodied AI & Neuromorphic Robotics",
  description:
    "Portfolio of Vijay Shankaran Vivekanand - Embodied AI, Robot Perception, Adaptive Control, Neuromorphic Systems & Event-Based Vision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-steam-bg text-slate-100 min-h-screen selection:bg-steam-blue selection:text-black">
        {children}
      </body>
    </html>
  );
}

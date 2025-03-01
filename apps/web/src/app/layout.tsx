import "./globals.css";

import { MenuNavBar } from "@/components/menu/menu-nav-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MenuNavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

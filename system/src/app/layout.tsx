import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "./providers";
import "./reset.css";

export const metadata = {
  title: "Padaria Sabor da Praça",
  icons: {
    icon: "/images/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <NextAuthProvider>
          <ToastContainer />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

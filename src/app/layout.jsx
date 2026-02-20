
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "YogIA Center",
    description: "Tu viaje hacia el bienestar empieza aquí.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

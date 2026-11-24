import { Quicksand } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-scope", 
});

export const metadata = {
  title: { default: "Ellxso", template: "%s | Ellxso" },
  description: "Watches, wallets, perfumes and glasses for men and women.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
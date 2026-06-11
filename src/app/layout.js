import { Toaster } from "sonner";
import { Montserrat, Open_Sans } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.fondationfitma.org"),
  title: {
    default: "Fondation Fitma — Bâtir l'Afrique Numérique",
    template: "%s | Fondation Fitma",
  },
  description:
    "Fondation Fitma — Le bras philanthropique de Fitma.africa. Fitma Academy forme les entrepreneurs, Fitma Espace les accueille.",
  keywords: [
    "Fondation Fitma",
    "Fitma Academy",
    "coworking Conakry",
    "formation entrepreneuriat Guinée",
    "incubation startups Afrique",
  ],
  authors: [{ name: "Fondation Fitma", url: "https://www.fondationfitma.org" }],
  openGraph: {
    type: "website",
    locale: "fr_GN",
    url: "https://www.fondationfitma.org",
    siteName: "Fondation Fitma",
    title: "Fondation Fitma — Bâtir l'Afrique Numérique, Ensemble",
    description: "Fitma Academy · Fitma Espace · Dons & Partenariats",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fondation Fitma",
    description: "Bâtir l'Afrique numérique, ensemble",
    images: ["/og-image.jpg"],
  },
  icons: { icon: "/logo/fitma-favicon.ico", apple: "/logo/fitma-apple.png" },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#2E7D32",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable}`}>
      <body
        className="font-body antialiased"
        style={{ background: "var(--neige)", color: "var(--encre)" }}
      >
        <SessionProvider session={session}>
          {children}
          <Toaster
            position="top-right"
            richColors
            expand
            toastOptions={{
              style: { fontFamily: "var(--font-opensans)", fontSize: "14px" },
              classNames: { toast: "rounded-xl shadow-card" },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}

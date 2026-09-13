import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Azeret_Mono, Big_Shoulders, Literata } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Big Shoulders is one variable family now; the opsz axis gives the
// "Display" cut at the sizes we use it.
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const serif = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { siteName: site.name, type: "website" },
};

// Restores ink/paper mode before first paint. localStorage only, nothing
// leaves the browser.
const restoreControls = `try{if(localStorage.getItem('sh-mode')==='paper')document.documentElement.dataset.mode='paper';}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: restoreControls }} />
        {children}
        {/* Vercel Web Analytics: cookieless, no browser storage. Visitors are
            counted by a server-side hash that rotates daily. */}
        <Analytics />
      </body>
    </html>
  );
}

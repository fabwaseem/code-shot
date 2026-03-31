import { Geist_Mono, Figtree } from "next/font/google"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeshot-woad.vercel.app"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CodeShot - Beautiful Code Screenshots in Seconds",
    template: "%s | CodeShot",
  },
  description:
    "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG. Perfect for social media, docs, and presentations.",
  keywords: [
    "code screenshot",
    "code screenshot generator",
    "beautiful code screenshots",
    "code to image",
    "code to PNG",
    "code snippet generator",
    "code image generator",
    "code sharing tool",
    "syntax highlighting",
    "developer tools",
    "code screenshot online",
    "code screenshot tool",
    "code screenshot app",
    "code to SVG",
    "programming screenshot",
  ],
  authors: [{ name: "CodeShot" }],
  creator: "CodeShot",
  publisher: "CodeShot",
  applicationName: "CodeShot",
  category: "Developer Tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CodeShot",
    title: "CodeShot - Beautiful Code Screenshots in Seconds",
    description:
      "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG. Perfect for social media, docs, and presentations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeShot - Beautiful Code Screenshots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeShot - Beautiful Code Screenshots in Seconds",
    description:
      "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG.",
    images: ["/og-image.png"],
    creator: "@codeshot",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-dvh overflow-hidden antialiased",
        fontMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CodeShot",
              description:
                "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG.",
              url: SITE_URL,
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Beautiful code syntax highlighting",
                "Multiple color themes",
                "Export as PNG, SVG, or JPEG",
                "Customizable backgrounds and padding",
                "Support for 20+ programming languages",
                "Dark and light mode",
                "Real-time preview",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-dvh overflow-hidden">
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}

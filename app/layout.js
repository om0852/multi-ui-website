import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './_components/Navbar';
import { ThemeProvider } from './_components/ThemeProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Multi UI Components",
  description: "A collection of reusable UI components for your next project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <Navbar />
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-6">
              <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Multi UI Components. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

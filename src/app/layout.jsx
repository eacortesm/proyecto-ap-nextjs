import { inter } from '@/app/ui/fonts'

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}

export default RootLayout;
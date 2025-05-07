import { inter } from '@/app/ui/fonts'
import Navbar from '@/components/Navbar';
import './globals.css'

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
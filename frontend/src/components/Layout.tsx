// src/components/Layout.tsx
import { ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="public-wrapper">
        <Navbar />
          <main className="min-vh-100 layout">
            {children}
          </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

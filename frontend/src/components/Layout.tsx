// src/components/Layout.tsx
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
        <main className="min-vh-100">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

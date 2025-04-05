// src/components/PublicLayout.tsx
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Navbar.css';

const PublicLayout = ({ children }: { children: ReactNode }) => {
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

export default PublicLayout;

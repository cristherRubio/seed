// src/components/PublicLayout.tsx
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
        <main className="min-vh-100">
            {children}
        </main>
      <Footer />
    </>
  );
};

export default PublicLayout;

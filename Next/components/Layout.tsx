import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 
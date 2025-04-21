import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

// We will render ThemeProvider on the client side
function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // On the server, we show only child components without ThemeProvider
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableColorScheme={false}>
      {children}
    </ThemeProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProviderClient>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProviderClient>
  );
}

export default appWithTranslation(MyApp); 
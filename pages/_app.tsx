import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';

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
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <title>Quotes From Around The World - Echoes</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        
        <meta name="author" content="Taiizor" />
        <meta name="description" content="Echoes is a modern platform that allows you to easily discover inspiring quotes from around the world. It is designed for anyone seeking wisdom and insight." />
        <meta name="keywords" content="quotes, inspirational quotes, wisdom, thought, motivation, personal development, famous quotes, world quotes, echoes, daily quotes, life quotes, philosophical quotes, lang quotes, author quotes, language quotes, quote collection, quote database, quote search, quote api" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="/Logo.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content="Echoes by Taiizor" />
        <meta property="og:url" content="https://echoes.soferity.com/" />
        <meta property="og:title" content="Quotes From Around The World - Echoes" />
        <meta property="og:image:alt" content="Quotes From Around The World - Echoes" />
        <meta property="og:description" content="Echoes is a modern platform that allows you to easily discover inspiring quotes from around the world. It is designed for anyone seeking wisdom and insight." />
        
        <meta name="twitter:site" content="@Taiizor" />
        <meta name="twitter:image" content="/Logo.png" />
        <meta name="twitter:creator" content="@Taiizor" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://echoes.soferity.com/" />
        <meta name="twitter:title" content="Quotes From Around The World - Echoes" />
        <meta name="twitter:image:alt" content="Quotes From Around The World - Echoes" />
        <meta name="twitter:description" content="Echoes is a modern platform that allows you to easily discover inspiring quotes from around the world. It is designed for anyone seeking wisdom and insight." />
        
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://echoes.soferity.com/" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProviderClient>
  );
}

export default appWithTranslation(MyApp); 
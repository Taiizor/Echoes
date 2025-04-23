import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark" data-theme="dark">
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
        
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c, l, a, r, i, t, y) {
                c[a] = c[a] || function() {
                  (c[a].q = c[a].q || []).push(arguments)
                };
                t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
              })(window, document, "clarity", "script", "r7gom76cmn");
            `
          }}
        />
        {/* /Microsoft Clarity */}
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EG6G7L3H9D" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-EG6G7L3H9D');
            `
          }}
        />
        {/*<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=G-EG6G7L3H9D" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>*/}
        {/* Google tag (gtag.js) */}
        
        {/* Yandex Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m, e, t, r, i, k, a) {
                m[i] = m[i] || function() {
                  (m[i].a = m[i].a || []).push(arguments)
                };
                m[i].l = 1 * new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) {
                    return;
                  }
                }
                k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(101223842, "init", {
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
              });
            `
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/101223842" style={{ position: 'absolute', left: '-9999px' }} alt="Yandex Metrika" />
          </div>
        </noscript>
        {/* Yandex.Metrika counter */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
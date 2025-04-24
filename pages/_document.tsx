import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark" data-theme="dark">
      <Head>
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
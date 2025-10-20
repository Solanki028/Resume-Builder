// Print-to-PDF via hidden iframe (no popup).
// - Keeps your exact styling
// - Preserves clickable links (absolute URLs)
// - No forced link color/display; header links stay visible on the gradient
// - To remove browser date/URL: uncheck "Headers and footers" in the print dialog.

export async function downloadResumePdf(): Promise<void> {
  try {
    const src = document.getElementById('resume-preview')
    if (!src) throw new Error('Resume preview element (#resume-preview) not found')

    // Ensure fonts in the main doc are loaded first
    const anyDoc = document as any
    if (anyDoc.fonts?.ready) await anyDoc.fonts.ready

    // Hidden iframe (bypasses popup blockers)
    const iframe = document.createElement('iframe')
    Object.assign(iframe.style, {
      position: 'fixed', right: '0', bottom: '0',
      width: '0', height: '0', border: '0'
    } as CSSStyleDeclaration)
    iframe.setAttribute('aria-hidden', 'true')
    iframe.setAttribute('tabindex', '-1')
    document.body.appendChild(iframe)

    const idoc = iframe.contentDocument!
    const iwin = iframe.contentWindow!

    // Print-only CSS: A4, margins, avoid splits. Do NOT override link color/display.
    const printCss = `
@page { size: A4; margin: 12mm 12mm 14mm 12mm; }
html, body { background: #ffffff !important; }
body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

#resume-print-root { width: 210mm; margin: 0 auto; background: #ffffff !important; }
#resume-print-root * { box-sizing: border-box; }

/* Keep blocks whole across pages */
h1, h2, h3, h4, section,
div[class*="rounded"], div[class*="border"], div[class*="shadow"],
.card, .badge, li, p { break-inside: avoid-page !important; page-break-inside: avoid !important; }

/* Links: keep original color/layout; just ensure they’re printable & clickable */
a[href] {
  text-decoration: underline !important;
  pointer-events: auto !important;
  overflow: visible !important;
}
a[href] * { text-decoration: inherit !important; }
a[href] svg { display: inline-block !important; }

/* Neutralize sticky/overflow that can clip in print */
.sticky, [class*="sticky"] { position: static !important; top: auto !important; }
.overflow-hidden, .overflow-y-auto, .overflow-x-auto { overflow: visible !important; }

/* Hide interactive UI if it sneaks in */
button, [role="button"], [data-no-print="true"] { display: none !important; }
    `.trim()

    // Copy your CSS <link> and <style> tags verbatim (no cssRules access)
    const linkTags = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
      .map(lnk => lnk.outerHTML).join('\n')
    const styleTags = Array.from(document.querySelectorAll<HTMLStyleElement>('style'))
      .map(st => st.outerHTML).join('\n')

    // Write iframe HTML shell. Title intentionally empty so it doesn’t show in headers.
    idoc.open()
    idoc.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <base href="${document.baseURI}">
    ${linkTags}
    ${styleTags}
    <style>${printCss}</style>
  </head>
  <body>
    <div id="resume-print-root"></div>
  </body>
</html>`)
    idoc.close()

    // Clone the resume and inject
    const target = idoc.getElementById('resume-print-root')
    if (!target) throw new Error('Print root missing in iframe')

    const cloned = src.cloneNode(true) as HTMLElement
    cloned.removeAttribute('id')
    cloned.style.backgroundColor = '#ffffff'

    // Normalize anchors to absolute URLs so they stay clickable in the PDF
    const anchors = cloned.querySelectorAll<HTMLAnchorElement>('a[href]')
    anchors.forEach(a => {
      const raw = a.getAttribute('href') || ''
      try {
        const abs = new URL(raw, document.baseURI).href
        a.setAttribute('href', abs)
      } catch {
        a.removeAttribute('href') // invalid URL → remove to avoid corrupting others
      }
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener')
      a.style.pointerEvents = 'auto'
      a.style.overflow = 'visible'
      // Do NOT force display/color here; preserve original header styling
    })

    target.appendChild(cloned)

    // Wait for iframe resources (CSS/fonts) to load
    await waitForIframeReady(iwin)

    // Print & cleanup
    await delay(50)
    iwin.focus()
    iwin.print()

    setTimeout(() => { try { document.body.removeChild(iframe) } catch {} }, 1500)
  } catch (err) {
    console.error('[PDF] Print export failed:', err)
    alert('Failed to generate PDF. Please check console for details.')
  }
}

/* helpers */
function waitForIframeReady(win: Window): Promise<void> {
  return new Promise((resolve) => {
    const done = async () => {
      try {
        const anyDoc = win.document as any
        if (anyDoc?.fonts?.ready) await anyDoc.fonts.ready
      } catch {}
      resolve()
    }
    if (win.document.readyState === 'complete') done()
    else win.addEventListener('load', done, { once: true })
  })
}
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

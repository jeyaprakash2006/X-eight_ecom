# X EIGHT

Premium, responsive smartwatch concept store. The landing page features an interactive HK9 Pro reconstruction based on the product reference supplied by the user.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. ES modules need an HTTP server; do not open index.html directly with file://.

## Included

- Real-time Three.js watch rendering with pointer and keyboard rotation.
- HK9 Pro photo-based geometry: rounded alloy case, curved glass, red-ring knurled crown, microphone, side button, woven loop, circular clasp, and colourful 02/38 dial.
- Strap previews, alternate dial, illustrative exploded view, and reset controls.
- Scroll parallax, pinned engineering story, responsive navigation, and reduced-motion handling.
- Product search, category filters, sorting, wishlist, comparison, configuration, persistent device-local bag, quantity controls, coupon and validated demo checkout.
- No real payment, fulfilment or email. Delivery fields are discarded after confirmation; they are not transmitted or persisted.
- WebMCP tools for reading the catalog/bag and staging a configured watch in the bag.
- Static image fallback when WebGL is unavailable.

## Main files

- `dist/index.html` — landing page and editorial sections.
- `dist/style.css` — shared design and responsive styling.
- `dist/app.js` — store, dialogs and checkout.
- `dist/hk9-model.js` — reusable HK9 Pro model factory.
- `dist/hk9-watch.js` — HK9 viewer, lighting, motion and input.
- `dist/watch3d.js` — original fictional X EIGHT product viewer.
- `dist/models/hk9-pro.glb` — binary glTF export with embedded dial/material textures.
- `dist/assets/hk9-pro-render.png` — transparent render used as WebGL fallback.

## HK9 reference and accuracy

Reference: https://gdsimba.en.made-in-china.com/product/rENpZKzAfjWs/China-HK9-PRO-Smartwatch-NFC-Wireless-Charging-2-02-Inch-Full-Touch-Screen-Series-8-Reloj-Intelligent-HK9-Smartwatch.html

The reconstruction follows supplier photographs, not engineering drawings or a scan. The supplier does not provide credible case measurements. The GLB uses approximate physical scale derived from the listed 2.02-inch display diagonal. Internal layers, sensor underside and preview colourways are illustrative. Do not use this model for manufacturing, fitting accessories or dimensional inspection.

The existing X Ultra / X Pro / X Core catalog remains fictional. HK9 is a featured visual showcase, not a verified retail offer. Store prices are demo prices in INR.

## Dependencies and assets

Three.js 0.186.1 is vendored in `dist/vendor`; its MIT license is included. BufferGeometryUtils is from the same Three.js release. The original collection image and mountain campaign are AI-generated; the HK9 render is generated from this site's actual 3D geometry. Google Fonts supplies typography. No build step or package installation is required.

## Hosting

The registered Sites identity is in `.openai/hosting.json`. Static output is `dist`. Publishing credentials must not be saved in the repository.

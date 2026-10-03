# X EIGHT

Premium, responsive smartwatch concept store with ten pages, a local admin preview, and six sample watches. The landing page features an interactive HK9 Pro reconstruction based on the product reference supplied by the user.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. ES modules need an HTTP server; do not open index.html directly with file://.

## Included

- Real-time Three.js watch rendering with pointer and keyboard rotation.
- HK9 Pro reference-based geometry: convex silver case, curved glass, red-ring knurled crown, two speaker slots, microphone, side button, continuous ivory braided yarn, circular clasp and white 10:08 dashboard.
- Strap previews, alternate dial, front/side/sensor inspection presets, illustrative exploded assembly, and reset controls.
- Scroll parallax, pinned engineering story, responsive navigation, and reduced-motion handling.
- Six concept watches: X Ultra, X Pro, X Core, X Active, X Air and X Mini. Shared catalog data drives the landing page and all store pages.
- Dedicated Shop, Product, Saved, Compare, Bag, Checkout, About and Support pages with search, filters, 3D configuration, persistent device-local bag, quantity controls, coupon and validated demo checkout.
- `admin.html` is a browser-local catalog and demo-receipts dashboard: add/edit products, preview stock, hide/show, import/export JSON, reset sample data, and inspect receipts without delivery details. It does not provide secure multi-user administration or server persistence.
- No real payment, fulfilment or email. Delivery fields are discarded after confirmation; they are not transmitted or persisted.
- WebMCP tools for reading the catalog/bag and staging a configured watch in the bag.
- Static image fallback when WebGL is unavailable.

## Main files

- `dist/index.html` — landing page and editorial sections.
- `dist/style.css` and `dist/pages.css` — shared design and responsive page styling.
- `dist/catalog.js` — six base products, local catalog overrides, and shared browser-local shopping state.
- `dist/admin.html`, `dist/admin.js`, `dist/admin.css` — local admin dashboard.
- `dist/pages.js` — page rendering and store interactions.
- `dist/app.js` — store, dialogs and checkout.
- `dist/hk9-model.js` — reusable HK9 Pro model factory.
- `dist/hk9-watch.js` — HK9 viewer, lighting, motion and input.
- `dist/watch3d.js` — original fictional X EIGHT product viewer.
- `dist/models/hk9-pro.glb` — binary glTF export with embedded dial/material textures.
- `dist/assets/hk9-pro-render.png` — transparent render used as WebGL fallback.

## HK9 reference and accuracy

Reference: https://gdsimba.en.made-in-china.com/product/rENpZKzAfjWs/China-HK9-PRO-Smartwatch-NFC-Wireless-Charging-2-02-Inch-Full-Touch-Screen-Series-8-Reloj-Intelligent-HK9-Smartwatch.html

The current reconstruction follows the two multi-view and exploded-assembly sheets supplied by the user. Their unmodified source images are in `dist/assets/watch-reference-views.png` and `watch-reference-assembly.png`; the display and PCB select regions with texture UVs. The braid consists of continuous crossing tubes with over-under displacement. Sensor inspection hides the loop to reveal the back. The GLB uses approximate physical scale derived from the listed 2.02-inch display diagonal. These images are not measured CAD or a scan, so an exact dimensional match is unverified. Internal layers and preview colourways are illustrative. Do not use this model for manufacturing or dimensional inspection.

The six X EIGHT watches are fictional concept products. HK9 is a featured visual showcase, not a verified retail offer. Store prices are demo prices in INR.

## Dependencies and assets

Three.js 0.186.1 is vendored in `dist/vendor`; its MIT license is included. BufferGeometryUtils is from the same Three.js release. The original collection image and mountain campaign are AI-generated; the HK9 render is generated from this site's actual 3D geometry. Google Fonts supplies typography. No build step or package installation is required.

## Hosting

The prior Sites identity is in `.openai/hosting.json`. It must be reconnected if the project is unavailable in the active Sites account. Static output is `dist`. Publishing credentials must not be saved in the repository.

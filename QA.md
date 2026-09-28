# Verification

- Desktop store flow: category filtering, sorting, wishlist, product search and empty results, comparison, 3D configuration, selected finish/size, bag quantity totals, persistence across reload, checkout validation, invalid/valid coupon, demo confirmation, and privacy of stored receipt.
- Mobile: navigation, shopping drawer and removal, scroll chapters, reduced motion, and no horizontal overflow at 320, 390, 768 and 1024 CSS pixels.
- HK9: model and studio WebGL canvases, strap selection, pointer rotation/reset, dial toggle, exploded view/reset, Escape close, existing product purchase flow, and image fallback without WebGL.
- GLB: valid binary glTF 2 header, 19 meshes, 8 materials and 2 embedded textures. Not manufacturing CAD.
- JavaScript syntax and static HTML asset references checked.
- WebMCP: all three tools registered in the in-app browser; valid add-to-bag matched visible state, invalid zero quantity rejected without modifying the bag, catalog/bag read-back verified.

Local visual verification screenshots are in ignored `output/playwright/`. Product imagery and typography were inspected on desktop and mobile. Checkout is intentionally a demo; no live payment integration is configured.

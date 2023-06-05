# Basic Usage

For basic HTML integration as a web component.

### Web Component

```html
<script src="https://www.unpkg.com/@iiif/thumbnail-panel/dist/web-components/index.umd.js"></script>
```

### Stylesheet

```html
<link rel="stylesheet" href="https://www.unpkg.com/@iiif/thumbnail-panel/dist/style.css"></link>
```

## Example

```html
<html>
  <head>
    <title>IIIF Thumbnail Panel</title>
    <meta charset="UTF-8" />
     <!-- Reference Thumbnail Panel basic styling from CDN -->
    <link rel="stylesheet" href="https://www.unpkg.com/@iiif/thumbnail-panel/dist/style.css"></link>
  </head>
  <body>
    <!-- Import Thumbnail Panel from CDN -->
    <script src="https://www.unpkg.com/@iiif/thumbnail-panel/dist/web-components/index.umd.js"></script>

    <!-- Simple navigation -->
    <nav>
      <button id="tp-prev">Previous</button>
      <button id="tp-next">Next</button>
    </nav>

    <!-- Web component -->
    <thumbnail-panel
      id="tp"
      iiif-content="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
    ></thumbnail-panel>

    <!-- Our own custom javascript to handle events -->
    <script>
      const tp = document.getElementById("tp");
      const nextButton = document.getElementById("tp-next");
      const prevButton = document.getElementById(
        "tp-prev"
      );

      tp.addEventListener("resource-changed", async (e) => {
        const { resourceIds } = e.detail;

        nextButton.setAttribute("data-id", resourceIds.next);
        if (!resourceIds.next) {
          nextButton.setAttribute("disabled", true);
        } else {
          nextButton.removeAttribute("disabled");
        }

        prevButton.setAttribute("data-id", resourceIds.previous);
        if (!resourceIds.previous) {
          prevButton.setAttribute("disabled", true);
        } else {
          prevButton.removeAttribute("disabled");
        }
      });

      nextButton.addEventListener("click", (e) => {
        const next = e.target.getAttribute("data-id");
        if (next !== "null") tp.setAttribute("current-resource-id", next);
      });

      prevButton.addEventListener("click", (e) => {
        const prev = e.target.getAttribute("data-id");
        if (prev !== "null") tp.setAttribute("current-resource-id", prev);
      });
    </script>

  </body>
</html>
```

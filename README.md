# ADU Financing Calculator

This calculator helps homeowners estimate their ADU (Accessory Dwelling Unit) financing options based on their current mortgage situation.

## Embedding the Calculator

To embed the ADU calculator in your website, add the following code:

```html
<!-- Add the calculator styles -->
<link rel="stylesheet" href="https://your-deployed-url.netlify.app/assets/index.css">

<!-- Add the calculator element -->
<adu-calculator></adu-calculator>

<!-- Add the calculator script -->
<script src="https://your-deployed-url.netlify.app/assets/embed.js"></script>
```

The calculator will automatically initialize and render within the `<adu-calculator>` element.

## Development

To run the project locally:

```bash
npm install
npm run dev
```

To build the project:

```bash
npm run build
```

This will create both the standalone webapp and the embeddable version.
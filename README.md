# Enza OpenAPI Developer Portal

This is the Enza REST API documentation portal built with [Zudoku](https://zudoku.dev).

## 📁 Project Structure

```
enza-portal/
├── public/                      # Static files (copied to dist during build)
│   ├── apis/
│   │   └── generalapi.yaml     # OpenAPI specification
│   └── logos/
│       ├── logo.svg            # Light theme logo
│       └── logo-dark.svg       # Dark theme logo
├── pages/                       # Documentation pages (MDX/Markdown)
│   └── docs/
│       ├── introduction.mdx
│       └── example.mdx
├── dist/                        # Build output (generated, not in git)
│   └── enza-openapi-dev-portal/
├── package.json                 # Dependencies and scripts
├── zudoku.config.ts            # Zudoku configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The portal will be available at: `http://localhost:3000/enza-openapi-dev-portal`

### Build

Build the production site:

```bash
npm run build
```

This creates a `dist/` folder with the static site.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the site
2. Push the `dist/` folder to the `gh-pages` branch
3. Deploy to: `https://enzagroup.github.io/enza-openapi-dev-portal/`

## 📝 Updating the API Documentation

### Method 1: Update the OpenAPI file directly

1. Edit `public/apis/generalapi.yaml`
2. The changes will be reflected immediately in dev mode
3. Rebuild for production: `npm run build`

### Method 2: Keep source in apis/ folder

If you prefer to keep the source file in `apis/` and copy to `public/`:

```bash
# After editing apis/generalapi.yaml
Copy-Item "apis/generalapi.yaml" -Destination "public/apis/generalapi.yaml"
```

## 🎨 Customization

### Logo
- Light theme: `public/logos/logo.svg`
- Dark theme: `public/logos/logo-dark.svg`

### Theme Colors
Edit `zudoku.config.ts` to customize colors, fonts, and other settings.

### Documentation Pages
Add/edit MDX files in the `pages/docs/` directory.

## 🔧 Configuration

The main configuration is in `zudoku.config.ts`:

- **basePath**: `/enza-openapi-dev-portal` (for GitHub Pages)
- **apis.input**: Path to OpenAPI YAML file
- **theme**: Colors and fonts
- **metadata**: SEO and site information

## 📦 Deployment Structure

When deployed, the structure looks like:

```
https://enzagroup.github.io/enza-openapi-dev-portal/
├── /api                        # API Reference (from generalapi.yaml)
├── /docs                       # Documentation pages
├── /assets                     # JS, CSS, images
└── /logos                      # Logo files
```

## ⚠️ Important Notes

1. **Public Directory**: All files in `public/` are copied to `dist/` during build
2. **Base Path**: The `/enza-openapi-dev-portal` prefix is required for GitHub Pages
3. **API File**: Must be in `public/apis/` to be accessible after deployment
4. **Logos**: Must be in `public/logos/` to load correctly

## 🐛 Troubleshooting

### API not loading after deployment
- Ensure `generalapi.yaml` is in `public/apis/`
- Check the path in `zudoku.config.ts` matches: `./public/apis/generalapi.yaml`

### Logos not showing
- Ensure logos are in `public/logos/`
- Check paths in `zudoku.config.ts` include the basePath

### Build fails with "too many open files"
- This is a Windows limitation
- Try: `Remove-Item -Recurse -Force node_modules && npm install`

## 📚 Resources

- [Zudoku Documentation](https://zudoku.dev/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Enza Group Website](https://www.enzagroup.global/)

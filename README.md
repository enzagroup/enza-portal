# enza-portal

## REPO USED FOR GENERIC APIs (enza Developer Portal)

## Features

- 🔍 **Global Search** - Built-in Pagefind search to search across all API documentation (no API key required!)
- 📚 **OpenAPI Documentation** - Interactive API reference from OpenAPI/Swagger specs
- 🎨 **Custom Branding** - Branded with enza Group identity
- 🌙 **Dark Mode** - Built-in dark mode support

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The portal will be available at `http://localhost:3000`

**Note:** Search functionality requires a production build to work (see below).

### Build

```bash
npm run build
```

This builds the site and generates the search index using Pagefind.

### Preview Build Locally

To test the search functionality locally:

```bash
npm run build
npx serve dist
```

Then open the URL shown (usually `http://localhost:3000`)

### Deploy

```bash
npm run deploy
```

This builds and deploys to GitHub Pages.

## Search Functionality

The portal includes a **global search bar** powered by **Pagefind** that:
- ✅ **No API key required** - completely free and open-source
- 🔍 Searches across all API endpoints and documentation
- ⚡ Fast, static search with minimal bandwidth usage
- 🌐 Works offline after initial page load
- 📦 Automatically indexes content during build

### How Search Works

1. During `npm run build`, Pagefind automatically indexes all your content
2. The search bar appears in the header of the built site
3. Users can search for:
   - API endpoint names (e.g., "create customer", "instant issuing")
   - Descriptions and summaries
   - Parameters and field names
   - Response codes and messages
   - Any text content in your API documentation

### Testing Search

After building:
```bash
npm run build
npx serve dist
```

Try searching for:
- "customer" - finds customer management APIs
- "card" - finds card-related endpoints
- "authentication" - finds auth requirements
- "instant" - finds instant issuing endpoint

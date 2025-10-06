# 🚀 Deployment Guide

## How the Project Works

### Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT MODE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Edit files:                                             │
│     • apis/generalapi.yaml  (source)                        │
│     • pages/docs/*.mdx                                      │
│     • zudoku.config.ts                                      │
│                                                              │
│  2. Run: npm run dev                                        │
│                                                              │
│  3. View at: http://localhost:3000/enza-openapi-dev-portal │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Build & Deploy Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD PROCESS                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Sync API files                                     │
│  ┌────────────────────┐         ┌──────────────────────┐   │
│  │ apis/              │  COPY   │ public/              │   │
│  │ └─generalapi.yaml  │ ──────> │ └─apis/              │   │
│  │                    │         │   └─generalapi.yaml  │   │
│  └────────────────────┘         └──────────────────────┘   │
│                                                              │
│  Step 2: Build with Zudoku                                  │
│  ┌────────────────────┐         ┌──────────────────────┐   │
│  │ public/            │ BUILD   │ dist/                │   │
│  │ pages/             │ ──────> │ └─enza-openapi-      │   │
│  │ zudoku.config.ts   │         │    dev-portal/       │   │
│  └────────────────────┘         │    ├─index.html      │   │
│                                  │    ├─assets/         │   │
│                                  │    ├─apis/           │   │
│                                  │    └─logos/          │   │
│                                  └──────────────────────┘   │
│                                                              │
│  Step 3: Deploy to GitHub Pages                             │
│  ┌────────────────────┐         ┌──────────────────────┐   │
│  │ dist/              │ PUSH    │ gh-pages branch      │   │
│  │                    │ ──────> │ (GitHub)             │   │
│  └────────────────────┘         └──────────────────────┘   │
│                                           │                  │
│                                           ▼                  │
│                                  ┌──────────────────────┐   │
│                                  │ Live Website         │   │
│                                  │ enzagroup.github.io  │   │
│                                  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Step-by-Step Deployment

### Option 1: Automatic (Recommended)

```bash
# This runs all steps automatically
npm run deploy
```

What happens:
1. `prebuild` script runs → syncs `apis/` to `public/apis/`
2. `build` script runs → creates `dist/` folder
3. `gh-pages` pushes `dist/` to GitHub

### Option 2: Manual Steps

```bash
# Step 1: Sync API file
npm run sync-api

# Step 2: Build the site
npm run build

# Step 3: Deploy to GitHub Pages
gh-pages -d dist
```

## 🔄 Workflow for Updating API

### When you edit the OpenAPI spec:

**Method A: Edit in `apis/` (Recommended)**
```bash
# 1. Edit the source file
code apis/generalapi.yaml

# 2. Sync to public folder
npm run sync-api

# 3. Test locally
npm run dev

# 4. Deploy
npm run deploy
```

**Method B: Edit in `public/` directly**
```bash
# 1. Edit directly
code public/apis/generalapi.yaml

# 2. Test locally
npm run dev

# 3. Deploy
npm run deploy

# 4. Backup to source (optional)
Copy-Item public/apis/generalapi.yaml -Destination apis/generalapi.yaml
```

## 📁 File Locations Explained

| File | Purpose | Deployed? |
|------|---------|-----------|
| `apis/generalapi.yaml` | Source file (editable) | ❌ No |
| `public/apis/generalapi.yaml` | Build input | ✅ Yes (copied to dist) |
| `dist/enza-openapi-dev-portal/apis/generalapi.yaml` | Final deployed file | ✅ Yes (on GitHub) |

## 🌐 URLs After Deployment

| Environment | URL |
|-------------|-----|
| **Local Dev** | `http://localhost:3000/enza-openapi-dev-portal` |
| **Production** | `https://enzagroup.github.io/enza-openapi-dev-portal` |
| **API Spec** | `https://enzagroup.github.io/enza-openapi-dev-portal/apis/generalapi.yaml` |

## ⚙️ Configuration Files

### `zudoku.config.ts`
```typescript
{
  basePath: "/enza-openapi-dev-portal",  // GitHub Pages path
  apis: {
    input: "./public/apis/generalapi.yaml"  // Must be in public/
  }
}
```

### `package.json`
```json
{
  "homepage": "https://enzagroup.github.io/enza-openapi-dev-portal/",
  "scripts": {
    "prebuild": "npm run sync-api",  // Auto-sync before build
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

## 🐛 Common Issues

### Issue: API not loading after deployment
**Cause**: YAML file not in `public/apis/`  
**Fix**: Run `npm run sync-api` before building

### Issue: 404 on GitHub Pages
**Cause**: Incorrect basePath  
**Fix**: Ensure `basePath: "/enza-openapi-dev-portal"` in config

### Issue: Logos not showing
**Cause**: Logos not in `public/logos/`  
**Fix**: Copy logos to `public/logos/` directory

## ✅ Pre-Deployment Checklist

- [ ] API file synced: `npm run sync-api`
- [ ] Logos in `public/logos/`
- [ ] Test locally: `npm run dev`
- [ ] Build succeeds: `npm run build`
- [ ] Check `dist/` folder has all files
- [ ] Deploy: `npm run deploy`
- [ ] Verify on GitHub Pages (wait 1-2 minutes)

## 🔍 Verifying Deployment

After deploying, check these URLs:

1. **Main site**: https://enzagroup.github.io/enza-openapi-dev-portal/
2. **API spec**: https://enzagroup.github.io/enza-openapi-dev-portal/apis/generalapi.yaml
3. **Logo**: https://enzagroup.github.io/enza-openapi-dev-portal/logos/logo.svg

If any return 404, the file wasn't copied to `public/` before building.

## 📞 Need Help?

1. Check the main `README.md`
2. Review Zudoku docs: https://zudoku.dev/docs
3. Check GitHub Pages settings in your repository

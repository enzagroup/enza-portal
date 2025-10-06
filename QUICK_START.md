# Quick Start Guide

Get your Zudoku documentation site running in minutes!

## 🚀 Immediate Next Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Zudoku 0.32.5
- React 18+
- Lucide React (icons)
- TypeScript
- gh-pages deployment tool

### 2. Test Locally

```bash
npm run dev
```

Your site will be available at: **http://localhost:3000**

### 3. Deploy to GitHub

```bash
git add .
git commit -m "Initial Zudoku setup"
git push origin main
```

**That's it!** Your site will be live at:
**https://enzagroup.github.io/enza-openapi-dev-portal/**

---

## 📋 Checklist Before First Deploy

- [ ] GitHub repository created: `enzagroup/enza-openapi-dev-portal`
- [ ] GitHub Pages enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Workflow permissions set (Settings → Actions → Read and write permissions)
- [ ] Your OpenAPI spec is in `apis/generalapi.yaml`
- [ ] Run `npm install` successfully
- [ ] Test locally with `npm run dev`
- [ ] Commit and push to `main` branch

---

## 🎯 Project Files Overview

### Core Configuration
- **`package.json`** - Dependencies and scripts
- **`zudoku.config.tsx`** - Zudoku configuration (navigation, APIs, metadata)

### Content
- **`docs/index.mdx`** - Homepage content
- **`apis/generalapi.yaml`** - Your OpenAPI specification

### Deployment
- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`public/.nojekyll`** - Ensures GitHub Pages works correctly

### Documentation
- **`README.md`** - Project overview
- **`DEPLOYMENT.md`** - Detailed deployment guide
- **`QUICK_START.md`** - This file!

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run lint` | Run ESLint |

---

## ✨ Customize Your Site

### 1. Update Metadata

Edit `zudoku.config.tsx`:

```typescript
metadata: {
  title: "Your Company API Docs",
  description: "Your custom description",
}
```

### 2. Add More Documentation Pages

Create new `.mdx` files in the `docs/` folder:

```bash
docs/
  ├── index.mdx
  ├── getting-started.mdx
  ├── authentication.mdx
  └── examples.mdx
```

Then update the sidebar in `zudoku.config.tsx`.

### 3. Add More API Specifications

Place additional OpenAPI files in `apis/` and reference them in `zudoku.config.tsx`:

```typescript
apis: [
  {
    type: "file",
    input: "./apis/generalapi.yaml",
    navigationId: "api",
  },
  {
    type: "file",
    input: "./apis/another-api.yaml",
    navigationId: "api",
  },
]
```

---

## 🆘 Need Help?

### Common Issues

**Port 3000 already in use?**
```bash
# Kill the process or use a different port
npm run dev -- --port 3001
```

**Build failing?**
- Check your `apis/generalapi.yaml` is valid OpenAPI
- Run `npm install` again
- Check Node version: `node --version` (should be 18+)

**Site not deploying?**
- Check GitHub Actions tab for errors
- Verify GitHub Pages is enabled
- Wait 2-3 minutes after first deploy

### Resources

- [Zudoku Documentation](https://zudoku.dev)
- [GitHub Pages Guide](./DEPLOYMENT.md)
- [OpenAPI Specification](https://swagger.io/specification/)

---

## 🎉 You're Ready!

Your Zudoku project is fully configured and ready to deploy. 

**Next:** Run `npm install` and then `npm run dev` to see your docs locally!

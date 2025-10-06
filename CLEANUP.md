# 🧹 Cleanup Instructions

## Files to DELETE (Old Documentation System)

These are old static HTML files that conflict with Zudoku:

```
❌ DELETE THESE:
├── index.html           (old homepage)
├── api.html             (old API page)
├── api/                 (old API HTML files)
├── docs/                (old docs HTML files)
├── assets/              (old assets - check if needed)
```

## Files to KEEP (New Zudoku System)

```
✅ KEEP THESE:
├── public/              (Zudoku static files)
│   ├── apis/
│   │   └── generalapi.yaml
│   └── logos/
├── apis/                (source files)
│   └── generalapi.yaml
├── package.json
├── zudoku.config.ts
├── tsconfig.json
├── README.md
├── DEPLOYMENT-GUIDE.md
└── .gitignore
```

## Quick Cleanup Commands

Run these in PowerShell:

```powershell
# Remove old files
Remove-Item index.html -Force
Remove-Item api.html -Force
Remove-Item -Recurse api -Force
Remove-Item -Recurse docs -Force
Remove-Item -Recurse assets -Force

# Keep only Zudoku files
```

## After Cleanup

1. Build fresh: `npm run build`
2. Deploy: `npm run deploy`
3. Wait 2-3 minutes for GitHub Pages to update

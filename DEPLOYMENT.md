# Deployment Guide

## GitHub Pages Deployment

### Prerequisites
- Git repository hosted on GitHub
- Repository name: `enza-openapi-dev-portal`
- Organization: `enzagroup`

### Setup Steps

#### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/enzagroup/enza-openapi-dev-portal
2. Click on **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
5. Save the settings

#### 2. Configure Repository Permissions

1. In your repository, go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

#### 3. Deploy Your Site

**Option A: Automatic Deployment (Recommended)**

Push your code to the `main` or `master` branch:

```bash
git add .
git commit -m "Initial Zudoku setup"
git push origin main
```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the Zudoku site
- Deploy to GitHub Pages

**Option B: Manual Deployment**

You can also deploy manually using gh-pages:

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

#### 4. Verify Deployment

After deployment completes (2-3 minutes):
- Visit: https://enzagroup.github.io/enza-openapi-dev-portal/
- Check the **Actions** tab to see deployment status
- Green checkmark = successful deployment
- Red X = deployment failed (check logs)

### Troubleshooting

#### Site Not Loading / 404 Error

1. Verify GitHub Pages is enabled in Settings → Pages
2. Check that the source is set to **GitHub Actions**
3. Verify the workflow completed successfully in the Actions tab
4. Wait 2-3 minutes after deployment for DNS propagation

#### Build Failures

1. Check the Actions tab for error messages
2. Common issues:
   - Missing dependencies: Run `npm install` locally first
   - Invalid YAML in `apis/generalapi.yaml`
   - Syntax errors in `zudoku.config.tsx`

#### Base Path Issues

The site is configured with `basePath: "/enza-openapi-dev-portal"` in `zudoku.config.tsx`. 

If deploying to a different repository or custom domain:
- Update `basePath` in `zudoku.config.tsx`
- Update `homepage` in `package.json`

### Local Testing Before Deployment

Always test locally before deploying:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build and preview production
npm run build
npm run preview
```

### Continuous Deployment

The project is set up for continuous deployment:
- Every push to `main`/`master` triggers automatic deployment
- No manual intervention required
- Deployment typically takes 2-3 minutes

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   docs.enzagroup.com
   ```

2. Configure DNS with your domain provider:
   - Type: CNAME
   - Name: docs (or your subdomain)
   - Value: enzagroup.github.io

3. Update `basePath` in `zudoku.config.tsx` to `""` (empty string)

4. In GitHub Settings → Pages → Custom domain, enter your domain

## Manual Deployment with gh-pages

If you prefer manual control over deployments:

```bash
# Build and deploy in one command
npm run deploy
```

This will:
1. Run `npm run build` to create the production build
2. Deploy the `dist` folder to the `gh-pages` branch
3. GitHub will automatically serve the site

## Environment Variables

Currently no environment variables are required. If you need to add secrets (API keys, etc.):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secret
4. Reference in workflow: `${{ secrets.YOUR_SECRET_NAME }}`

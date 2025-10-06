# Enza Portal - API Documentation

Built with [Zudoku](https://github.com/zuplo/zudoku) - A framework for building high quality, interactive API documentation.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📦 Project Structure

```
enza-portal/
├── apis/                  # OpenAPI/Swagger specifications
│   └── generalapi.yaml   # Main API specification
├── docs/                  # Documentation pages (MDX)
│   └── index.mdx         # Home page
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── dist/                  # Build output (generated)
├── zudoku.config.tsx     # Zudoku configuration
└── package.json          # Project dependencies
```

## 🌐 Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main/master branch.

### Setup GitHub Pages:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push your changes to the main/master branch
5. The workflow will automatically build and deploy your site

Your documentation will be available at: **https://enzagroup.github.io/enza-openapi-dev-portal/**

### Manual Deployment:

**Method 1: Using GitHub Actions UI**
1. Go to **Actions** tab in your repository
2. Select **Deploy Zudoku to GitHub Pages** workflow
3. Click **Run workflow**

**Method 2: Using gh-pages command**
```bash
npm run deploy
```

This will build and deploy your site directly to the `gh-pages` branch.

📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 Configuration

Edit `zudoku.config.tsx` to customize:
- Navigation structure
- API references
- Sidebar configuration
- Site metadata

## 📝 Adding Documentation

Add new `.mdx` files in the `docs/` directory and update the sidebar configuration in `zudoku.config.tsx`.

## 📚 Resources

- [Zudoku Documentation](https://zudoku.dev)
- [Zudoku GitHub Repository](https://github.com/zuplo/zudoku)

## 📄 License

This project is licensed under the MIT License.

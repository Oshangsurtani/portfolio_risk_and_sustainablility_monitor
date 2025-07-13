# 🚀 Deployment Guide

## Quick Deploy to Netlify (Recommended)

### Option 1: One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/walmart-ai-supply-chain)

### Option 2: Manual Deploy

1. **Fork this repository** to your GitHub account
2. **Sign up for Netlify** at https://netlify.com
3. **Connect GitHub** to Netlify
4. **Import your forked repository**
5. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`
6. **Deploy!**

## Environment Variables

Set these in your Netlify dashboard under Site Settings > Environment Variables:

```bash
VITE_API_URL=https://walmart-supply-chain-api.vercel.app
NODE_ENV=production
```

## Custom Domain (Optional)

1. Go to **Site Settings > Domain Management**
2. **Add custom domain**
3. **Configure DNS** with your domain provider
4. **Enable HTTPS** (automatic with Netlify)

## Backend Deployment (Optional)

If you want to deploy your own backend:

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/walmart-ai-supply-chain&project-name=walmart-supply-chain-api&repository-name=walmart-supply-chain-backend&root-directory=backend)

### Deploy to Railway
1. Go to https://railway.app
2. **Connect GitHub** and select your repository
3. **Select backend folder** as root directory
4. **Set environment variables**:
   ```bash
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_DEFAULT_REGION=us-east-1
   ```
5. **Deploy!**

## Monitoring & Analytics

### Netlify Analytics
- Enable in Site Settings > Analytics
- Track page views, unique visitors, bandwidth

### Performance Monitoring
- Built-in Lighthouse scores
- Core Web Vitals tracking
- Real User Monitoring (RUM)

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Check variable names (must start with `VITE_`)
- Verify in Netlify dashboard
- Redeploy after changes

### 404 Errors on Refresh
- Ensure `_redirects` file exists in `public/`
- Check `netlify.toml` redirect rules

## Security

### Headers
Security headers are automatically configured in `netlify.toml`:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

### HTTPS
- Automatic SSL certificates
- HTTP to HTTPS redirects
- HSTS headers

## Performance Optimization

### Automatic Optimizations
- Asset compression (Gzip/Brotli)
- Image optimization
- CDN distribution
- Caching headers

### Manual Optimizations
- Code splitting (already configured)
- Lazy loading components
- Bundle analysis with `npm run build`

## Support

For deployment issues:
1. Check Netlify deploy logs
2. Verify build commands
3. Test locally with `npm run build && npm run preview`
4. Contact support if needed

---

**🎉 Your Walmart AI Supply Chain Platform is now live!**
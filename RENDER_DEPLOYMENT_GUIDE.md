# Render Deployment Guide for SlumLink

## Issues Fixed
✅ **render.yaml** - Added proper Render configuration  
✅ **Port Configuration** - Now uses Render's `PORT` environment variable  
✅ **Environment Variables** - Configured for Render deployment  

## Required Environment Variables in Render Dashboard

You must set these environment variables in your Render dashboard:

### Database Configuration (from your .env file)
```
DB_HOST=slum-link-database.mysql.database.azure.com
DB_USER=your_azure_mysql_username
DB_PASSWORD=your_azure_mysql_password  
DB_NAME=your_database_name
DB_PORT=3306
```

### Email Configuration
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Security
```
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

## Steps to Deploy on Render

### 1. Set Environment Variables
1. Go to your Render dashboard
2. Select your service 
3. Go to "Environment" tab
4. Add all the variables listed above with your actual values

### 2. Deploy Commands
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 3. Common Issues & Solutions

#### 502 Bad Gateway Error
- ❌ **Cause:** Environment variables not set properly
- ✅ **Solution:** Double-check all DB credentials in Render dashboard

#### 503 Service Unavailable  
- ❌ **Cause:** Service failed to start
- ✅ **Solution:** Check Render logs for startup errors

#### SSL Connection Error
- ❌ **Cause:** Azure MySQL requires SSL connections
- ✅ **Solution:** Already fixed in db.js with SSL configuration

### 4. Frontend Configuration

If your frontend is deployed separately, update API URLs to point to your Render backend:
```javascript
// Replace localhost URLs with your Render backend URL
const API_BASE_URL = 'https://your-render-app-name.onrender.com';
```

### 5. Verification Steps

After deployment:
1. Check `/api/health` endpoint returns `{"status": "ok"}`
2. Test database connection 
3. Verify static files are served properly
4. Test API endpoints

## Troubleshooting Logs

To debug issues:
1. Go to Render dashboard → Your service → Logs
2. Look for error messages during startup
3. Check if database connection succeeds
4. Verify environment variables are loaded

## Next Steps

1. Set all environment variables in Render dashboard
2. Redeploy your service
3. Test the application
4. Monitor logs for any remaining issues
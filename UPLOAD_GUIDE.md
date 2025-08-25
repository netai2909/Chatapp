# 📁 UPLOAD GUIDE - What Goes Where?

This guide shows you exactly which files to upload to each service.

## 🔧 BACKEND (Render.com) - Upload These Files:

**Upload your ENTIRE project folder to Render:**
```
📁 Your Project Folder (contains everything):
├── 📄 package.json
├── 📁 server/
│   └── 📄 index.js
├── 📁 client/
│   ├── 📄 package.json
│   ├── 📁 src/
│   ├── 📁 public/
│   └── ... (all client files)
├── 📁 DEPLOYMENT/
│   ├── 📄 README.md
│   ├── 📄 CHECKLIST.md
│   └── 📄 UPLOAD_GUIDE.md
└── 📄 README.md
```

**What Render Does:**
- ✅ Reads `package.json` from root
- ✅ Runs `npm install` to install dependencies
- ✅ Runs `npm start` to start the server
- ✅ Serves your backend API

## 🌐 FRONTEND (Vercel.com) - Upload These Files:

**Vercel automatically detects and uploads from your GitHub repository.**

**What Vercel Does:**
- ✅ Reads `client/package.json`
- ✅ Runs `npm install` in client folder
- ✅ Runs `npm run build` to build React app
- ✅ Serves the built files

## 🔑 ENVIRONMENT VARIABLES - Set These:

### In Render (Backend):
```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-app.vercel.app
```

### In Vercel (Frontend):
```
REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com
```

## 📝 IMPORTANT NOTES:

1. **Don't upload files manually** - both services pull from GitHub
2. **Make sure all files are committed** to GitHub first
3. **The DEPLOYMENT folder** is just for reference - you don't need to upload it anywhere
4. **Both services** will automatically detect the right files to use

## 🚀 DEPLOYMENT FLOW:

1. **Push all code to GitHub**
2. **Connect GitHub to Render** → Backend deploys
3. **Connect GitHub to Vercel** → Frontend deploys
4. **Set environment variables** in both services
5. **Test your live app!**

---

**That's it!** Both services handle the file selection automatically.

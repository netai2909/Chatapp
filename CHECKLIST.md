# ✅ DEPLOYMENT CHECKLIST

Follow this checklist step by step to deploy your chat app!

## 🔧 BACKEND (Render.com)

- [ ] **Sign up/Login to Render.com**
- [ ] **Create new Web Service**
- [ ] **Connect GitHub repository**
- [ ] **Configure settings:**
  - [ ] Name: `chat-app-backend`
  - [ ] Environment: `Node`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Root Directory: (leave empty)
- [ ] **Add Environment Variables:**
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
- [ ] **Deploy and wait for completion**
- [ ] **Copy backend URL** (e.g., `https://your-app.onrender.com`)

## 🌐 FRONTEND (Vercel.com)

- [ ] **Sign up/Login to Vercel.com**
- [ ] **Create new project**
- [ ] **Import GitHub repository**
- [ ] **Configure settings:**
  - [ ] Framework: `Create React App`
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
  - [ ] Install Command: `npm install`
- [ ] **Add Environment Variable:**
  - [ ] `REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com`
  - [ ] **Replace with your actual backend URL from above**
- [ ] **Deploy and wait for completion**
- [ ] **Copy frontend URL** (e.g., `https://your-app.vercel.app`)

## 🔧 UPDATE BACKEND CORS

- [ ] **Go back to Render dashboard**
- [ ] **Add new Environment Variable:**
  - [ ] `CORS_ORIGIN=https://your-app.vercel.app`
  - [ ] **Replace with your actual Vercel URL from above**
- [ ] **Redeploy backend** (Manual Deploy → Deploy latest commit)

## 🎉 TEST YOUR APP

- [ ] **Open Vercel URL in browser**
- [ ] **Login with username "User1"**
- [ ] **Open another tab with same URL**
- [ ] **Login with username "User2"**
- [ ] **Send messages between users**
- [ ] **Verify real-time messaging works**

## 🚀 SUCCESS!

- [ ] **Your chat app is now live on the internet!**
- [ ] **Users can access from anywhere in the world**
- [ ] **Real-time messaging works globally**
- [ ] **Future updates deploy automatically**

---

**Need Help?** Check the README.md file in this folder!

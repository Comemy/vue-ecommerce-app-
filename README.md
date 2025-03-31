# 🛒 Vue E-commerce App (Fullstack Project)

**🔗 Live Demo**: [🌐 https://tubular-dasik-ccde75.netlify.app](https://tubular-dasik-ccde75.netlify.app)  
**🔗 GitHub Repo**: [📁 https://github.com/Comemy/vue-ecommerce-app-](https://github.com/Comemy/vue-ecommerce-app-)

---

## 🧰 Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Chart.js

### Backend
- Node.js + Express
- MySQL (hosted on Railway)
- JWT Authentication
- Multer + Cloudinary (for image upload)

### Deployment
- Netlify (Frontend)
- Render (Backend)
- Railway (Database)

---

## 📦 Features

- 👤 Signup / Login system (JWT)
- 🛍️ Admin: Add/Edit/Delete Product
- 🛒 User: Cart, Checkout, Order System
- 📊 Admin Dashboard: Sales Bar + Donut Charts
- 🖼️ Upload & Preview Profile Picture
- ✅ Form Validation, Status toggle
- 📦 REST API Integration (axios)

---

## 🔧 Project Setup



```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
node index.js
```

---

🔐 Environment Variables (ตัวอย่าง)

.env (Backend)
env
คัดลอก
แก้ไข
PORT=10000

DB_HOST=gondola.proxy.rlwy.net
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=railway
DB_PORT=3306

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

.env (Frontend)
VITE_API_URL=https://your-backend.onrender.com

---

🙏 Credit
💡 Inspired by: Mikelopster (YouTube)

🛠️ Developed and customized by: Thanapath Busayaphongchai

---

🚀 สิ่งที่สามารถพัฒนาเพิ่มเติม
- เพิ่ม Responsive เต็มระบบ
- เพิ่ม Payment Gateway จริง (Stripe, QR)
- ระบบ Reset Password
- เพิ่ม Unit Test (Jest / Vitest)
- ใช้ Supabase/Auth0 สำหรับ OAuth

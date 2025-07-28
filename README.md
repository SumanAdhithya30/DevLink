# 🚀 DevLink - Developer Contact Manager

DevLink is a full-stack MERN application that allows developers to manage their personal contact list securely. Users can register, login, and manage their own workspace where they can add, update, and delete developer contacts.

---

## 📌 Features

- 🔐 **User Authentication** (JWT-based)
- 🧾 **Register & Login** system
- 🧑‍💻 **Private dashboard** for each user
- ➕ **Add**, ✏️ **Update**, ❌ **Delete** developer contacts
- 🔍 **Clean UI** with React + Tailwind
- 📦 **MongoDB** for secure storage
- ☁️ **Fully deployable** to cloud

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js  
- MongoDB (Atlas)
- Mongoose
- JWT & Bcrypt for Auth

---

## 🧩 Folder Structure

```
DevLink/
├── client/          # React Frontend
├── server/          # Express Backend  
├── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repo:
```bash
git clone https://github.com/your-username/DevLink.git
cd DevLink
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
# Add .env with MONGO_URI and JWT_SECRET
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/devlink
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

---

## 📸 Screenshots

*Coming Soon - Add screenshots of your application here*

---

## 🌐 Live Demo

*TBD after deployment*

---

## 🚀 Deployment

Ready to deploy on:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Database**: MongoDB Atlas

---

## 🧑‍💻 Author

Made with ❤️ by **[Your Name]**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '✨ Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Notes

- Update `your-username` with your GitHub handle
- Add `.env` details once finalized  
- Add deployment/live link when ready
- Replace placeholder screenshots with actual ones

---

**Happy Coding! 🎉**
# 📚 Book Store

A simple Book Store web application built using the **MERN stack** (MongoDB, Express, React, Node.js). Users can browse available books, add them to a **shopping cart** or **wishlist** — no login or authentication required.

---

## 🧰 Tech Stack

- **MongoDB** – NoSQL database to store book data
- **Express.js** – Web framework for backend API
- **React.js** – Frontend library for UI
- **Node.js** – Backend runtime environment

---

## 📁 Folder Structure

```
book-store/
│
├── back/       # Node.js + Express backend
│   ├── server.js
│   └── seed.js
│
└── front/      # React frontend
    └── ...
```

---

## 🚀 Features

- 🏠 Home page with all available books
- 🛒 Add/remove books to/from shopping cart
- 💖 Add/remove books to/from wishlist
- 🔍 Simple UI and fast performance
- ❌ No authentication required

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-store.git
cd book-store
```

---

### 2. Setup the Backend

```bash
cd back
npm install
```

#### Create `.env` file in the `back/` folder:

```env
MONGO_URI=mongodb://localhost:27017/bookStoreDB
FIXED_USER_ID=68121d46775ff176f362fb36
PORT=3000
```

#### (Optional) Seed the Database

```bash
node seed.js
```

#### Start the Backend Server

```bash
node server.js
```

The backend will run on: `http://localhost:3000`

---

### 3. Setup the Frontend

```bash
cd ../front
npm install
npm run dev
```

The frontend will run on: `http://localhost:3000` or another available port if 3000 is taken.

---

## 📡 API Endpoints

### 📘 Books

- `GET /books` – List all books

### 🛒 Shopping Cart

- `GET /cart-items` – Get cart items
- `POST /cart-items/add` – Add item to cart
- `DELETE /cart-items/remove` – Remove item from cart
- `DELETE /cart-items/clear` – Clear all cart items

### 💖 Wishlist

- `GET /wishlist-items` – Get wishlist items
- `POST /wishlist-items/add` – Add item to wishlist
- `PUT /wishlist-items/edit` – Replace wishlist
- `DELETE /wishlist-items/remove` – Remove specific item
- `DELETE /wishlist-items/clear` – Clear all wishlist items

---

## 🧪 Example Seed Data

Run the following to populate the database with fake books and a test user:

```bash
cd back
node seed.js
```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by **[Your Name]**  
Feel free to contribute, open issues, or suggest improvements!

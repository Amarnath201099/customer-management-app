# 🧾 Customer Management App – Qwipo Assignment

A full-stack web application for managing customers and their multiple addresses. Built with a modern tech stack (React, Express, SQLite) and styled using Bootstrap with a **mobile-first responsive** approach.

---

## 🌐 Live Demo Links

- 🔗 **Frontend (Vercel):** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
- 🔗 **Backend (Render):** [https://your-render-backend-url.onrender.com](https://your-render-backend-url.onrender.com)

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React JS, React Router              |
| Styling    | Bootstrap 5                         |
| Backend    | Node.js, Express.js                 |
| Database   | SQLite                              |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 📱 Features

- 🧑‍💼 Add, update, and delete customers
- 🏠 Add, update, and delete multiple addresses per customer
- 🔍 Search customers by name or phone
- 🌆 Filter customers by city, state, or pin code
- 📄 Pagination for customer list
- 📱 Responsive, mobile-first layout with Bootstrap
- ⚙️ Clean API with Express and SQLite
- 📁 Organized file structure (`client/` and `server/`)

---

## 📁 Project Structure

```
customer-management-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
├── server/ # Express backend
│ ├── controllers/
│ ├── db/
│ └── index.js
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/Amarnath201099/customer-management-app.git
cd customer-management-app
```

### 2. Backend Setup (server/)

```bash
cd server
npm install
node index.js
```

- Starts server at http://localhost:5000
- Uses SQLite stored in database.db

### 3. Frontend Setup (client/)

```bash
cd client
npm install
npm start
```

- Starts frontend at http://localhost:3000
- Connects to backend API at http://localhost:5000

---

## 🔍 API Overview

### Customers

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/api/customers`     | List customers (with filters) |
| POST   | `/api/customers`     | Add a new customer            |
| GET    | `/api/customers/:id` | Get a single customer         |
| PUT    | `/api/customers/:id` | Update a customer             |
| DELETE | `/api/customers/:id` | Delete a customer             |

### Addresses

| Method | Endpoint                       | Description                    |
| ------ | ------------------------------ | ------------------------------ |
| POST   | `/api/customers/:id/addresses` | Add an address for customer    |
| GET    | `/api/customers/:id/addresses` | Get all addresses for customer |
| PUT    | `/api/addresses/:addressId`    | Update an address              |
| DELETE | `/api/addresses/:addressId`    | Delete an address              |

---

## 🎯 Responsive Design & UI

- Built using **Bootstrap 5** with a **mobile-first** design philosophy.
- Layouts adapt across screen sizes (phones, tablets, desktops).
- Utility classes like `d-flex`, `gap`, `text-center`, etc., were used to ensure a clean UI quickly.

## 🧪 Testing

Manually tested all:

- Form validations
- Search and filter combinations
- Pagination
- CRUD operations for both **customers** and **addresses**

---

## 💡 Future Improvements

Here are some features and refinements that could be added in the future:

- 🚀 Add login/authentication with JWT
- 🏷️ Add ability to mark a primary address for each customer
- 📤 Export customer list to CSV or PDF
- 🖼️ Add profile pictures for customers
- 🎨 Improve form UI/UX with modals and client-side validation libraries
- 🧪 Add unit tests using Jest and integration tests with Supertest
- 🔔 Add toast notifications for actions (success/error)
- 🗄️ Move to PostgreSQL or MongoDB for production-scale deployment

---

## 🙌 Acknowledgements

- [Bootstrap](https://getbootstrap.com/)
- [SQLite](https://www.sqlite.org/)
- [React Router](https://reactrouter.com/)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)

---

## 💬 Suggestions & Feedback

If you have any suggestions, feedback, or improvements, feel free to:

- 🐞 Open an issue on the GitHub repo
- 💬 Drop a message on email
- ⭐ Or just star the repo if you found it useful

---

## 👤 Developed by

**Amarnath Racha**  
[Email me](mailto:amarnath201099@gmail.com)

This project was built as part of the Qwipo Full Stack Assignment.

# PingMe 📝🔔

**PingMe** is a full-stack note-taking and notification web application. Users can sign up, log in, create, save, and categorize notes, and receive timely notifications.

---

## 🌟 Features

- User authentication with **signup/login/logout** (JWT & Node.js)  
- Add, save, and categorize notes  
- Real-time notifications  
- Responsive design for desktop and mobile  
- Modern tech stack: **HTML, CSS, JavaScript, Node.js, Express, MongoDB**

---

## 💻 Tech Stack

| Frontend        | Backend         | Database | Authentication |
|-----------------|----------------|---------|----------------|
| HTML, CSS, JS   | Node.js, Express | MongoDB | JWT            |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jeevan9535/PingMe.git
````

### 2. Install dependencies, run server, and open app

```bash
cd server
npm install
npm start
# Then open in browser: http://localhost:5000/
```

---

## 📸 Screenshots

### Front Page

![Front Page](./assets/frontpage.png)

### Folder Structure

![Folder Structure](./assets/folderstructure.png)

---

## 🏆 Achievements / Learning

* Built a full-stack app from scratch
* Implemented user authentication & authorization
* Learned how to connect frontend and backend seamlessly
* Gained experience with MongoDB, JWT, and Express

---

## ⚙️ How This Works

1. **User Authentication**

   * Users can **sign up** with their email and password
   * Existing users can **log in** to access their account
   * Authentication is handled securely using **JWT tokens**

2. **Notes Management**

   * Once logged in, users can **create, edit, and delete notes**
   * Notes can be **categorized** for better organization
   * All notes are saved in **MongoDB**, ensuring persistence across sessions

3. **Real-Time Notifications**

   * Users receive **notifications** when a note is created or updated
   * Notifications are displayed dynamically on the frontend without page reloads

4. **Responsive Design**

   * Works seamlessly on **desktop and mobile devices**
   * Uses **HTML, CSS, and JavaScript** for a modern interface

5. **Backend API**

   * Built with **Node.js and Express** to handle all API requests
   * Routes are organized using **RESTful endpoints** for notes and user management

6. **Folder Structure**

   * `client/` – Frontend files (HTML, CSS, JS)
   * `server/` – Backend server (Node.js, Express)
   * `models/` – MongoDB models for Users and Notes
   * `routes/` – API route definitions
   * `controllers/` – Backend logic handling requests

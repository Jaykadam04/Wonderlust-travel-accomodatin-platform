# 🌍 Wonderlust — Travel Accommodation Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Joi](https://img.shields.io/badge/Joi-0080FF?style=for-the-badge&logoColor=white)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)

> A full-stack travel accommodation web application inspired by Airbnb — browse, create, and review travel listings from around the world.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Features](#-api-features)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏠 Project Overview

**Wonderlust** is a travel accommodation platform that allows users to discover and share unique travel stays from around the globe. Users can browse property listings, view detailed information about each accommodation, create new listings, edit existing ones, and leave reviews with star ratings.

The platform is built with a robust Node.js/Express backend, a MongoDB database, and server-rendered EJS templates — providing a fast and reliable full-stack experience.

---

## ✨ Key Features

- 🏡 **Accommodation Listings** — Create, view, edit, and delete travel listings with title, description, location, country, price, and image.
- ⭐ **Review System** — Add and delete star-rated reviews (1–5) with comments on any listing.
- ✅ **Input Validation** — All user input is validated using Joi schemas before being processed.
- 🛡️ **Custom Error Handling** — Centralised `ExpressError` class with HTTP status codes and a global error handler.
- 🔄 **RESTful Routes** — Full CRUD operations following REST conventions using `method-override` for `PUT` and `DELETE`.
- 🎨 **EJS Templating** — Server-rendered views using EJS with `ejs-mate` for reusable layouts.
- 🗄️ **Cascading Deletes** — Reviews are automatically removed when a listing is deleted (Mongoose post-hook).

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| **Runtime**   | Node.js                           |
| **Framework** | Express.js v5                     |
| **Database**  | MongoDB with Mongoose v8          |
| **Templating**| EJS + ejs-mate                    |
| **Validation**| Joi v17                           |
| **HTTP**      | method-override (PUT/DELETE)      |

---

## 📁 Project Structure

```
Wonderlust-travel-accommodation-platform/
├── app.js              # Main application entry point
├── schema.js           # Joi validation schemas
├── package.json        # Project dependencies
│
├── models/             # Mongoose database models
│   ├── listing.js      # Listing model (with cascade-delete hook)
│   └── review.js       # Review model
│
├── routes/             # Express route handlers
│   ├── listings.js     # CRUD routes for listings
│   └── review.js       # Routes for creating/deleting reviews
│
├── views/              # EJS templates
│   ├── listings/       # Listing-related views (index, show, new, edit)
│   └── error.ejs       # Error page template
│
├── public/             # Static assets (CSS, JS, images)
│
├── utils/              # Utility/helper modules
│   ├── ExpressError.js # Custom error class
│   └── wrapAsync.js    # Async error wrapper for route handlers
│
└── init/               # Database initialisation scripts
    ├── data.js         # Seed data
    └── index.js        # Seeding script
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on the default port `27017`)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jaykadam04/Wonderlust-travel-accomodatin-platform.git
   cd Wonderlust-travel-accomodatin-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start MongoDB**

   Make sure your local MongoDB instance is running:

   ```bash
   mongod
   ```

4. **(Optional) Seed the database**

   ```bash
   node init/index.js
   ```

---

## ▶️ Usage

Start the development server:

```bash
node app.js
```

The application will be available at **http://localhost:3000**.

Navigate to **http://localhost:3000/listings** to browse all accommodation listings.

---

## 🗺️ API Features

### Listings

| Method   | Route                  | Description                  |
|----------|------------------------|------------------------------|
| `GET`    | `/listings`            | Display all listings         |
| `GET`    | `/listings/new`        | Show form to create listing  |
| `POST`   | `/listings`            | Create a new listing         |
| `GET`    | `/listings/:id`        | Show a specific listing      |
| `GET`    | `/listings/:id/edit`   | Show form to edit listing    |
| `PUT`    | `/listings/:id`        | Update a listing             |
| `DELETE` | `/listings/:id`        | Delete a listing             |

### Reviews

| Method   | Route                                    | Description              |
|----------|------------------------------------------|--------------------------|
| `POST`   | `/listings/:id/reviews`                  | Add a review to listing  |
| `DELETE` | `/listings/:id/reviews/:reviewid`        | Delete a review          |

---

## 🔒 Security Features

- **Joi Schema Validation** — All request bodies for listings and reviews are validated with strict Joi schemas before hitting the database, preventing malformed or malicious data.
- **Custom Middleware** — `validateListing` and `validateReview` middleware functions intercept invalid requests and respond with descriptive `400 Bad Request` errors.
- **Centralised Error Handling** — A custom `ExpressError` class and a global Express error-handling middleware ensure no unhandled errors leak implementation details to the client.
- **Async Error Catching** — The `wrapAsync` utility wraps all async route handlers to automatically forward errors to the global error handler, preventing unhandled promise rejections.
- **Cascading Deletes** — A Mongoose `post('findOneAndDelete')` hook ensures reviews associated with a deleted listing are cleaned up, maintaining data integrity.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please ensure your code follows the existing style and that all routes are properly validated.

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Jaykadam04">Jaykadam04</a></p>

# CRUD MVC Project

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a **CRUD (Create, Read, Update, Delete)** web application built using the **MVC (Model-View-Controller)** architectural pattern. It provides a simple interface to manage resources (e.g., users, products, or tasks) and interact with a database.

The **Admin Frontend** is a web application built with **Next.js** that provides CRUD (Create, Read, Update, Delete) operations for managing all database tables. It features a user-friendly interface, authentication, and integration with a backend API. This tool is designed for administrators to manage data efficiently with a focus on usability and performance.

## Features

- **CRUD Operations** for all tables in the database.
- **Authentication** using NextAuth.js.
- **Responsive Design** with Tailwind CSS.
- **Modular Components** for form generation and table rendering.
- **Role-Based Access Control** to restrict access to administrative functions.
- **Seamless Backend Integration** via RESTful APIs.

## Technologies

- **Framework**: Next.js
- **State Management**: React
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Icons**: react-icons
- **Build Tool**: Vercel (Next.js built-in support)
- **Linting**: ESLint

## Architecture

This project is a **frontend-only** application built on a component-based architecture. The key components include:

- **Reusable Components**: Shared UI components such as forms, tables, and modals.
- **Pages**: Next.js pages corresponding to CRUD operations for each table.
- **API Integration**: Interacts with backend APIs to fetch and manipulate data.
- **Authentication**: Handles login and session management with NextAuth.js.

## Setup and Installation

### Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/)
- **npm**: Comes with Node.js
- **Backend**: Ensure the backend is running and accessible

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/admin-frontend.git
   cd admin-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   - Create a `.env.local` file in the root directory:
     ```env
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_secret_key
     BACKEND_API_URL=http://localhost:4000
     ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

6. **Access the App**
   - Open your browser and go to `http://localhost:3000` (default port).

---

## Usage

Once the app is running, administrators can log in to access the dashboard. The app provides CRUD functionality for all tables with features like:

- **Table Views**: List all records with pagination.
- **Create**: Add new records via dynamic forms.
- **Read**: View details of a specific record.
- **Update**: Edit existing records.
- **Delete**: Remove records with confirmation prompts.

## API Endpoints

The application interacts with the backend using the following API endpoints:

- **Users**

  - **GET** `/api/users`: Fetch all users
  - **POST** `/api/users`: Create a new user
  - **PUT** `/api/users/:id`: Update user details
  - **DELETE** `/api/users/:id`: Delete a user

- **Additional Endpoints**
  - Similar CRUD routes exist for all database tables (e.g., Invoices, Providers, Payments).

Make sure the backend is running and accessible at the URL defined in your `.env.local` file.

---

## Contributing

Contributions are welcome! If you'd like to enhance this project, please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

All contributions, including bug fixes, new features, and documentation improvements, are appreciated.

## License

This project is licensed under the MIT License.

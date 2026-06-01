# Auto-SCM Project Documentation

## 1. Project Overview
Auto-SCM is a comprehensive and premium vehicle marketplace and comparison platform designed to help users search, compare, and book vehicles. The system also features an administrative dashboard for managing vehicle inventory, brands, user activities, and bookings.

## 2. Technology Stack
The project is built using a modern Full-Stack architecture:

**Frontend**:
- **Framework**: ReactJS
- **Build Tool**: ViteJS
- **Styling & UI**: Bootstrap, Framer Motion (for animations), Lucide React (for icons)
- **Routing**: React Router DOM
- **Network Requests**: Axios
- **Real-time Communication**: Socket.IO Client

**Backend**:
- **Runtime**: NodeJS
- **Framework**: ExpressJS
- **Database Driver**: MySQL2
- **Authentication**: JSONWebToken (JWT) & BcryptJS (Password Hashing)
- **File Uploads**: Multer
- **Validation**: Express-Validator
- **Real-time Communication**: Socket.IO

**Database**:
- **RDBMS**: MySQL
- **Management Tool**: PHPMyAdmin

## 3. System Architecture
The application follows a standard Client-Server architecture:
1. **Client (Frontend)**: A Single Page Application (SPA) built with React. It provides the user interface and handles user interactions.
2. **Server (Backend)**: An Express.js REST API that processes business logic, handles authentication, validates requests, and serves data to the frontend.
3. **Database**: A MySQL relational database (`automobiledb.sql`) that stores structured application data securely.

## 4. Database Schema (`automobiledb`)
The database consists of several interconnected tables to manage the marketplace's data:

- **`users`**: Manages authentication and user profile details (Admin and standard users).
- **`user_activity`**: Logs actions and sessions of users for auditing and analytics.
- **`user_preferences`**: Stores user-specific settings and preferences.
- **`brands`**: Catalogs vehicle manufacturers/brands.
- **`models`**: Details vehicle models associated with specific brands.
- **`variants`**: Contains specific variations (trims, engine types) of the vehicle models.
- **`vehicle_types`**: Classifications or categories of vehicles (e.g., SUV, Hatchback, Sedan).
- **`bookings`**: Stores customer vehicle reservation and booking records.

## 5. Core Features

### User Features:
- **Authentication**: Secure Login and Registration using JWT.
- **Search & Filter**: Powerful search capabilities to find vehicles by name, brand, or type.
- **Comparison Engine**: Side-by-side comparison of multiple vehicles to help users make informed decisions.
- **Booking System**: Allow users to reserve/book vehicles.
- **Real-Time Features**: Real-time notifications or updates integrated via Socket.IO.

### Admin Features:
- **Dashboard**: Centralized hub to view overall metrics and recent activities.
- **Inventory Management**: Complete CRUD operations for Brands, Models, Variants, and Vehicle Types.
- **User Management**: View user data and monitor user activities.
- **Booking Management**: Review and update the status of user bookings.

## 6. Installation & Setup Guide

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server & PHPMyAdmin
- Database Credentials: Username `root`

### Database Setup
1. Open PHPMyAdmin.
2. Create a new database named `automobiledb`.
3. Import the provided `automobiledb.sql` file into the new database to set up the tables and schema.

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables. Ensure the `.env` file looks like this:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=automobiledb
   JWT_SECRET=your_super_secret_jwt_key_123
   ```
   *(Note: Ensure `DB_PASSWORD` matches your root MySQL password if you have one, or leave it empty if there isn't one).*
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at `http://localhost:5173`.

## 7. Folder Structure
- **`/backend/`**: Contains the Express.js server, API route definitions, controllers, middleware, and database configuration.
- **`/frontend/`**: Contains the React.js application, React components, pages, styling, and state management logic.
- **`automobiledb.sql`**: The full database export used for the MySQL database.

# Auto-SCM - Setup & Run Guide

Auto-SCM is a premium vehicle marketplace and comparison platform.

## Prerequisites
- Node.js (v16+)
- MySQL Workbench 8.0
- npm or yarn

## Backend Setup
1. Open MySQL Workbench and run the content of `schema.sql` to setup your database.
2. Navigate to `backend/` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure `.env` file in `backend/` (already pre-configured for you based on your input):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_PASSWORD
   DB_NAME=automobiledb
   JWT_SECRET=your_super_secret_jwt_key_123
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Frontend Setup
1. Navigate to `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

## Login Credentials (Sample Data)
- **Admin**: `admin@autoscm.com` / `admin123`
- **User**: Register a new user via the Sign Up page.

## Features Verification
- **Search**: Search for "Tata" or "Nexon" on the home page.
- **Compare**: Click "Compare" on multiple vehicle cards to see the side-by-side table.
- **Admin**: Log in as admin to access the Dashboard and perform CRUD operations.

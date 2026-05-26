# Jaunt Solutions Backend

This is the backend for the Jaunt Solutions contact form, built with Node.js, Express, Prisma, and Neon PostgreSQL.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js installed
- Neon PostgreSQL database (get your `DATABASE_URL`)

### 2. Installation
Navigate to the `backend` directory and run:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory (one is already provided as a template):
```env
PORT=5000
DATABASE_URL="your_neon_postgresql_url"
```

### 4. Database Migration
Run the following commands to set up your database schema:
```bash
npx prisma migrate dev --name init
```

### 5. Start the Server
- Development mode: `npm run dev`
- Production mode: `npm start`

---

## 🚀 Hostinger Deployment Guide

To deploy this backend on Hostinger (Node.js Hosting):

1. **Upload Files**: Upload the `backend` directory to your Hostinger server (using FTP or Git).
2. **Setup Node.js App**:
   - In the Hostinger Panel, go to **Advanced > Node.js**.
   - Create a new application.
   - Point the **Application Root** to your backend folder.
   - Set **Application URL** (e.g., `api.jauntsolutions.com`).
   - Set **Startup File** to `server.js`.
3. **Install Dependencies**: Use the **Terminal** in Hostinger Panel or SSH:
   ```bash
   cd path/to/backend
   npm install
   ```
4. **Environment Variables**: Add your `DATABASE_URL` in the Hostinger Node.js app configuration or via a `.env` file.
5. **Run Migrations**: If your DB is not yet set up, run:
   ```bash
   npx prisma migrate deploy
   ```
6. **Start App**: Click **Start** in the Hostinger Node.js panel.
7. **Frontend Update**: Ensure your React app's `fetch` URL in `Contact.tsx` points to your production API URL instead of `localhost:5000`.

---

## 📄 API Reference

### POST `/api/contact`
Submits a new contact message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I am interested in your services."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": { ... }
}
```
